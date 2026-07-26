import { describe, expect, it } from 'vitest';
import type { DailyPmsLog } from '../types';
import { addDays } from './date';
import { calculatePrediction, identifyClusters } from './prediction';
const p=(date:string,value:DailyPmsLog['value']='pms'):DailyPmsLog=>({date,value,createdAt:'x',updatedAt:'x'});
const c=(start:string,length=3)=>Array.from({length},(_,i)=>p(addDays(start,i)));
describe('identifyClusters',()=>{
 it('groups adjacent PMS days',()=>expect(identifyClusters(c('2026-01-01',4),'2026-01-01','2026-01-20')).toHaveLength(1));
 it('merges clusters with one no-PMS day between',()=>expect(identifyClusters([...c('2026-01-01',2),...c('2026-01-04',2)],'2026-01-01','2026-01-20')).toEqual([{start:'2026-01-01',end:'2026-01-05',durationDays:5}]));
 it('keeps explicit no and missing days as zero',()=>expect(identifyClusters([p('2026-01-01'),p('2026-01-02','no_pms'),p('2026-01-04')],'2026-01-01','2026-01-10')).toHaveLength(2));
});
describe('calculatePrediction',()=>{
 it('requires at least three clusters',()=>expect(calculatePrediction([...c('2026-01-01'),...c('2026-02-01')],'2025-12-01','2026-04-01').status).toBe('insufficient_data'));
 it('predicts three regular clusters',()=>expect(calculatePrediction([...c('2026-01-01'),...c('2026-01-29'),...c('2026-02-26')],'2025-12-01','2026-03-20').status).toBe('prediction'));
 it('withholds an irregular pattern',()=>{const starts=['2025-10-01','2025-10-13','2025-12-20','2026-01-02','2026-03-10'];expect(calculatePrediction(starts.flatMap(x=>c(x)),'2025-09-01','2026-04-01').status).toBe('unstable_pattern')});
 it('supports one-day and long clusters',()=>{const logs=[...c('2025-01-01',1),...c('2025-02-01',14),...c('2025-03-04',2)];expect(calculatePrediction(logs,'2024-12-01','2025-03-20').clusterCount).toBe(3)});
 it('can produce a window over a year boundary',()=>{const starts=['2026-09-10','2026-10-08','2026-11-05','2026-12-03'];const r=calculatePrediction(starts.flatMap(x=>c(x,5)),'2026-08-01','2026-12-20');expect(r.predictedEnd?.startsWith('2027-')).toBe(true)});
});
