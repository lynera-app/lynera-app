import type { DailyPmsLog, PmsCluster, PredictionResult, ConfidenceLevel } from '../types';
import { addDays, daysBetween, enumerateDates, formatDate } from './date';

const MIN_HISTORY_DAYS = 90;
const MIN_CLUSTERS = 3;
const MIN_ZERO_GAP = 2;

const mean=(xs:number[])=>xs.reduce((a,b)=>a+b,0)/xs.length;
const median=(xs:number[])=>{ const s=[...xs].sort((a,b)=>a-b), i=Math.floor(s.length/2); return s.length%2?s[i]:(s[i-1]+s[i])/2; };
const sd=(xs:number[])=>{ if(xs.length<2)return 0; const m=mean(xs); return Math.sqrt(xs.reduce((sum,x)=>sum+(x-m)**2,0)/(xs.length-1)); };

export function identifyClusters(logs: DailyPmsLog[], historyStart: string, historyEnd: string): PmsCluster[] {
  const pms = new Set(logs.filter(l=>l.value==='pms' && l.date>=historyStart && l.date<=historyEnd).map(l=>l.date));
  const raw:PmsCluster[]=[]; let start:string|null=null; let previous:string|null=null;
  for(const date of enumerateDates(historyStart,historyEnd)) {
    if(pms.has(date)) { if(!start) start=date; previous=date; }
    else if(start && previous) { raw.push({start,end:previous,durationDays:daysBetween(start,previous)+1}); start=null; previous=null; }
  }
  if(start&&previous) raw.push({start,end:previous,durationDays:daysBetween(start,previous)+1});
  if(raw.length<2) return raw;
  const merged:PmsCluster[]=[raw[0]];
  for(const cluster of raw.slice(1)) {
    const last=merged[merged.length-1]; const zeroGap=daysBetween(last.end,cluster.start)-1;
    if(zeroGap<MIN_ZERO_GAP) { last.end=cluster.end; last.durationDays=daysBetween(last.start,last.end)+1; }
    else merged.push({...cluster});
  }
  return merged;
}

export function calculatePrediction(logs: DailyPmsLog[], historyStart: string, historyEnd: string): PredictionResult {
  const historyDays=daysBetween(historyStart,historyEnd)+1;
  const clusters=identifyClusters(logs,historyStart,historyEnd);
  const durations=clusters.map(c=>c.durationDays);
  const intervals=clusters.slice(1).map((c,i)=>daysBetween(clusters[i].start,c.start));
  const totalPmsDays=logs.filter(l=>l.value==='pms'&&l.date>=historyStart&&l.date<=historyEnd).length;
  const base={historyStart,historyEnd,historyDays,clusterCount:clusters.length,clusters,totalPmsDays,typicalClusterDuration:durations.length?Math.round(median(durations)):null,typicalInterval:intervals.length?Math.round(median(intervals)):null,intervalRange:intervals.length?[Math.min(...intervals),Math.max(...intervals)] as [number,number]:null};
  if(historyDays<MIN_HISTORY_DAYS || clusters.length<MIN_CLUSTERS) {
    const reasons=[]; if(historyDays<MIN_HISTORY_DAYS) reasons.push(`${historyDays} of 90 calendar days`); if(clusters.length<MIN_CLUSTERS) reasons.push(`${clusters.length} of 3 PMS-like symptom clusters`);
    return {...base,status:'insufficient_data',confidence:'insufficient',reliability:Math.min(35,Math.round((historyDays/MIN_HISTORY_DAYS)*15+(clusters.length/MIN_CLUSTERS)*20)),predictedStart:null,predictedEnd:null,explanation:`Not enough history to predict a recurring symptom window yet. Available: ${reasons.join(' and ')}.`};
  }
  const intervalMean=mean(intervals), intervalSd=sd(intervals), cv=intervalMean?intervalSd/intervalMean:1;
  if(cv>0.42 || Math.max(...intervals)-Math.min(...intervals)>24) {
    return {...base,status:'unstable_pattern',confidence:'low',reliability:28,predictedStart:null,predictedEnd:null,explanation:'Your logs do not currently show a consistent recurring pattern. The timing between symptom clusters varies considerably.'};
  }
  const weights=intervals.map((_,i)=>i+1); const weighted=intervals.reduce((sum,x,i)=>sum+x*weights[i],0)/weights.reduce((a,b)=>a+b,0);
  const uncertainty=Math.max(1,Math.ceil(intervalSd)); const center=addDays(clusters[clusters.length-1].start,Math.round(weighted));
  const duration=Math.max(1,Math.round(median(durations))); const predictedStart=addDays(center,-uncertainty); const predictedEnd=addDays(center,duration-1+uncertainty);
  const durationCv=durations.length>1?sd(durations)/Math.max(1,mean(durations)):0;
  const recency=daysBetween(clusters[clusters.length-1].end,historyEnd);
  let score=45 + Math.min(20,(clusters.length-3)*5) + Math.min(12,(historyDays-90)/30*4) + Math.max(0,18-cv*45) + Math.max(0,8-durationCv*20) - Math.min(12,recency/20);
  score=Math.max(36,Math.min(92,Math.round(score)));
  let confidence:ConfidenceLevel=score>=80?'high':score>=60?'moderate':'low';
  const range=`${Math.min(...intervals)} to ${Math.max(...intervals)} days`;
  return {...base,status:'prediction',confidence,reliability:score,predictedStart,predictedEnd,explanation:`Your ${clusters.length} PMS-like symptom clusters began ${range} apart. Recent intervals are weighted more heavily, and timing variability widens the possible window.`};
}
