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

export function Home({
  logs,
  prediction,
  onLog,
  onOpenCalendar
}: {
  logs: DailyPmsLog[];
  prediction: PredictionResult;
  onLog: (date: string, value?: PmsLogValue) => void;
  onOpenCalendar: () => void;
}) {
  const today = todayLocal();
  const current = logs.find((log) => log.date === today)?.value;
  const lastCluster = prediction.clusters[prediction.clusters.length - 1];
  const lastLabel = lastCluster ? formatRange(lastCluster.start, lastCluster.end) : 'No entries yet';
  const nextLabel = prediction.status === 'prediction'
    ? formatRange(prediction.predictedStart!, prediction.predictedEnd!)
    : 'More history needed';
  const hasHistory = logs.length > 0;

  return (
    <main className="home-screen">
      <section className="pattern-hero" aria-labelledby="pattern-overview-title">
        <div className="aurora-layer aurora-violet" aria-hidden="true" />
        <div className="aurora-layer aurora-blue" aria-hidden="true" />
        <div className="aurora-layer aurora-glow" aria-hidden="true" />

        <div className="pattern-content">
          <p className="hero-kicker" id="pattern-overview-title">Your pattern overview</p>

          <div className="hero-today">
            <span>Today</span>
            <strong>{formatDate(today, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
          </div>

          <div className="timeline-stage" aria-label={`Last PMS-like symptoms: ${lastLabel}. Today: ${formatDate(today, { day: 'numeric', month: 'long' })}. Next possible window: ${nextLabel}.`}>
            <div className="timeline-label timeline-label-left">
              <span>Last PMS-like symptoms</span>
              <strong>{lastLabel}</strong>
            </div>
            <div className="timeline-label timeline-label-center">
              <span>Today</span>
            </div>
            <div className="timeline-label timeline-label-right">
              <span>Next possible window</span>
              <strong>{nextLabel}</strong>
            </div>

            <svg className="pattern-arc" viewBox="0 0 640 230" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#a57aff" />
                  <stop offset="0.5" stopColor="#e5e4ff" />
                  <stop offset="1" stopColor="#6cc5ff" />
                </linearGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path className="arc-extension arc-extension-left" d="M46 196 L82 164" />
              <path className="arc-base" d="M82 164 Q320 -16 558 164" />
              <path className="arc-extension arc-extension-right" d="M558 164 L594 196" />
              <circle className="arc-marker arc-marker-left" cx="46" cy="196" r="8" />
              <circle className="arc-marker arc-marker-right" cx="594" cy="196" r="8" />
              <circle className="arc-today-halo" cx="320" cy="38" r="25" />
              <circle className="arc-today" cx="320" cy="38" r="13" filter="url(#softGlow)" />
            </svg>
          </div>

          <p className="hero-explainer">
            Lynera estimates recurring timing from your own symptom history. It does not identify a menstrual phase or make a diagnosis.
          </p>
        </div>
      </section>

      <div className="screen home-content">
        <section className="checkin-card card" aria-labelledby="daily-check-in-title">
          <div className="checkin-copy">
            <p className="eyebrow">Today</p>
            <h1 id="daily-check-in-title">How are you feeling today?</h1>
            <p className="muted">Logging is optional. One tap is enough.</p>
          </div>

          <div className="today-controls">
            <button
              className={current === 'pms' ? 'active pms' : ''}
              aria-pressed={current === 'pms'}
              onClick={() => onLog(today, 'pms')}
            >
              <span className="control-orb pms" aria-hidden="true" />
              <span>PMS-like<br />symptoms</span>
            </button>
            <button
              className={current === 'no_pms' ? 'active no' : ''}
              aria-pressed={current === 'no_pms'}
              onClick={() => onLog(today, 'no_pms')}
            >
              <span className="control-orb no" aria-hidden="true" />
              <span>No symptoms</span>
            </button>
            {current && (
              <button className="clear-today" onClick={() => onLog(today, undefined)}>
                Clear today’s entry
              </button>
            )}
          </div>

          <p className="device-privacy-note">
            <span className="privacy-lock" aria-hidden="true">⌑</span>
            Entries stay in this browser on this device.
          </p>
        </section>

        <section className="prediction-card card" aria-labelledby="prediction-title">
          <div className="prediction-header">
            <div>
              <p className="eyebrow">Prediction insights</p>
              {prediction.status === 'prediction' ? (
                <h2 id="prediction-title">
                  {formatDate(prediction.predictedStart!, { day: 'numeric', month: 'long' })} –{' '}
                  {formatDate(prediction.predictedEnd!, { day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
              ) : (
                <h2 id="prediction-title">
                  {prediction.status === 'insufficient_data' ? 'More history improves accuracy' : 'No stable pattern yet'}
                </h2>
              )}
            </div>
            <div className={`reliability ${prediction.confidence}`}>
              <small>Reliability</small>
              <strong>{prediction.reliability}%</strong>
              <span>{confidenceLabel(prediction.confidence)}</span>
            </div>
          </div>

          <div className="reliability-track" aria-hidden="true">
            <i style={{ width: `${prediction.reliability}%` }} />
          </div>
          <p>{prediction.explanation}</p>
          <dl className="prediction-stats">
            <div><dt>PMS clusters</dt><dd>{prediction.clusterCount}</dd></div>
            <div>
              <dt>{hasHistory ? 'History used' : 'Minimum history'}</dt>
              <dd>{hasHistory ? `${prediction.historyDays} days` : '90 days'}</dd>
            </div>
            <div><dt>PMS days</dt><dd>{prediction.totalPmsDays}</dd></div>
          </dl>
        </section>

        <section className="start-card card">
          <div>
            <p className="eyebrow">Add your history</p>
            <h2>Retroactive entries improve the forecast</h2>
            <p className="muted">Tap past dates or add a complete historical symptom range from the calendar.</p>
          </div>
          <button className="secondary-button" onClick={onOpenCalendar}>Open calendar</button>
        </section>

        <section className="safety-card card">
          <strong>Pattern estimate, not medical advice</strong>
          <p>Lynera only detects recurring timing patterns in your entries. Seek professional advice for severe, new, worsening, or disruptive symptoms.</p>
        </section>
      </div>
    </main>
  );
}
