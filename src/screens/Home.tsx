import type { DailyPmsLog, PmsLogValue, PredictionResult } from '../types';
import { formatDate, todayLocal } from '../lib/date';

function formatRange(start: string, end: string) {
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${formatDate(start, { day: 'numeric' })}–${formatDate(end, { day: 'numeric', month: 'short' })}`
    : `${formatDate(start, { day: 'numeric', month: 'short' })} – ${formatDate(end, { day: 'numeric', month: 'short' })}`;
}

export function Home({logs,prediction,onLog,onOpenCalendar}:{logs:DailyPmsLog[];prediction:PredictionResult;onLog:(d:string,v?:PmsLogValue)=>void;onOpenCalendar:()=>void}){
  const today=todayLocal();
  const current=logs.find(l=>l.date===today)?.value;
  const lastCluster=prediction.clusters[prediction.clusters.length - 1];
  const lastLabel=lastCluster ? formatRange(lastCluster.start,lastCluster.end) : 'No entries yet';
  const nextLabel=prediction.status==='prediction' ? formatRange(prediction.predictedStart!,prediction.predictedEnd!) : 'More history needed';

  return <main className="home-screen">
    <section className="pattern-hero" aria-labelledby="pattern-overview-title">
      <div className="aurora aurora-one" aria-hidden="true"/><div className="aurora aurora-two" aria-hidden="true"/>
      <div className="pattern-content">
        <p className="hero-kicker" id="pattern-overview-title">Your pattern overview</p>
        <div className="hero-today"><span>Today</span><strong>{formatDate(today,{weekday:'long',day:'numeric',month:'long'})}</strong></div>
        <div className="pattern-label pattern-label-left"><span>Last PMS-like symptoms</span><strong>{lastLabel}</strong></div>
        <div className="pattern-label pattern-label-right"><span>Next possible window</span><strong>{nextLabel}</strong></div>
        <div className="pattern-arc" aria-label={`Last PMS-like symptoms: ${lastLabel}. Today: ${formatDate(today,{day:'numeric',month:'long'})}. Next possible window: ${nextLabel}.`}>
          <svg viewBox="0 0 720 260" role="img" aria-hidden="true">
            <defs><linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9d6dff"/><stop offset="0.5" stopColor="#c7c7ff"/><stop offset="1" stopColor="#69baff"/></linearGradient></defs>
            <path className="arc-shadow" d="M90 220 Q360 8 630 220"/>
            <path className="arc-line" d="M90 220 Q360 8 630 220"/>
            <circle className="arc-end arc-end-left" cx="90" cy="220" r="11"/>
            <circle className="arc-end arc-end-right" cx="630" cy="220" r="11"/>
            <circle className="arc-now-halo" cx="360" cy="61" r="25"/>
            <circle className="arc-now" cx="360" cy="61" r="14"/>
          </svg>
        </div>
        <p className="hero-explainer">Lynera estimates recurring timing from your own symptom history. It does not identify a menstrual phase or diagnosis.</p>
      </div>
    </section>

    <div className="screen home-content">
      <section className="checkin-card card">
        <div><p className="eyebrow">Today</p><h1>How are you feeling?</h1><p className="muted">Logging is optional and takes one tap.</p></div>
        <div className="today-controls"><button className={current==='pms'?'active pms':''} onClick={()=>onLog(today,'pms')}><span className="control-orb pms"/>PMS-like symptoms</button><button className={current==='no_pms'?'active no':''} onClick={()=>onLog(today,'no_pms')}><span className="control-orb no"/>No symptoms</button>{current&&<button className="clear-today" onClick={()=>onLog(today,undefined)}>Clear today's entry</button>}</div>
        <p className="device-privacy-note"><span aria-hidden="true">⌁</span> Entries stay in this browser on this device.</p>
      </section>

      <section className="prediction-card card"><div className="prediction-header"><div><p className="eyebrow">Prediction insights</p>{prediction.status==='prediction'?<h2>{formatDate(prediction.predictedStart!,{day:'numeric',month:'long'})} – {formatDate(prediction.predictedEnd!,{day:'numeric',month:'long',year:'numeric'})}</h2>:<h2>{prediction.status==='insufficient_data'?'More history improves accuracy':'No stable pattern yet'}</h2>}</div><div className={`reliability ${prediction.confidence}`}><small>Reliability</small><strong>{prediction.reliability}%</strong><span>{prediction.confidence}</span></div></div><div className="reliability-track"><i style={{width:`${prediction.reliability}%`}}/></div><p>{prediction.explanation}</p><dl className="prediction-stats"><div><dt>PMS clusters</dt><dd>{prediction.clusterCount}</dd></div><div><dt>History used</dt><dd>{prediction.historyDays} days</dd></div><div><dt>PMS days</dt><dd>{prediction.totalPmsDays}</dd></div></dl></section>

      <section className="start-card card"><div><p className="eyebrow">Add your history</p><h2>Retroactive entries improve the forecast</h2><p className="muted">Tap past dates or add a complete historical symptom range from the calendar.</p></div><button className="secondary-button" onClick={onOpenCalendar}>Open calendar</button></section>
      <section className="safety-card card"><strong>Pattern estimate, not medical advice</strong><p>Lynera only detects recurring timing patterns in your entries. Seek professional advice for severe, new, worsening, or disruptive symptoms.</p></section>
    </div>
  </main>
}
