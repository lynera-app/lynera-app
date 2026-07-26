import type { CSSProperties } from 'react';
import type { DailyPmsLog, PmsLogValue, PredictionResult } from '../types';
import { formatDate, todayLocal } from '../lib/date';
import auroraHome from '../assets/aurora-home.png';

function formatRange(start: string, end: string) {
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${formatDate(start, { day: 'numeric' })}–${formatDate(end, { day: 'numeric', month: 'short' })}`
    : `${formatDate(start, { day: 'numeric', month: 'short' })} – ${formatDate(end, { day: 'numeric', month: 'short' })}`;
}

function confidenceLabel(value: PredictionResult['confidence']) {
  return value === 'insufficient' ? 'Insufficient' : value.charAt(0).toUpperCase() + value.slice(1);
}

export function Home({
  logs,
  prediction,
  onLog
}: {
  logs: DailyPmsLog[];
  prediction: PredictionResult;
  onLog: (date: string, value?: PmsLogValue) => void;
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
      <section className="pattern-hero" style={{ '--aurora-image': `url(${auroraHome})` } as CSSProperties} aria-labelledby="pattern-overview-title">
        <div className="pattern-content">
          <p className="hero-kicker" id="pattern-overview-title">Your pattern overview</p>

          <div className="hero-today">
            <strong>{formatDate(today, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
          </div>

          <div
            className="timeline-stage"
            aria-label={`Last PMS-like symptoms: ${lastLabel}. Today: ${formatDate(today, { day: 'numeric', month: 'long' })}. Next possible window: ${nextLabel}.`}
          >
            <div className="timeline-label timeline-label-left">
              <span>Last PMS-like<br />symptoms</span>
              <strong>{lastLabel}</strong>
            </div>
            <div className="timeline-label timeline-label-center">
              <strong>Today</strong>
            </div>
            <div className="timeline-label timeline-label-right">
              <span>Next possible window</span>
              <strong>{nextLabel}</strong>
            </div>

            <svg className="pattern-arc" viewBox="0 0 700 260" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="arcGradient" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="650" y2="0">
                  <stop offset="0" stopColor="#a876ff" />
                  <stop offset="0.5" stopColor="#f0edff" />
                  <stop offset="1" stopColor="#69c8ff" />
                </linearGradient>
                <filter id="todayGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path className="arc-base" d="M126 184 Q350 10 574 184" />
              <g className="arc-extension-dots arc-extension-dots-left">
                <circle cx="113" cy="195" r="3.2" />
                <circle cx="101" cy="205" r="3.2" />
                <circle cx="89" cy="215" r="3.2" />
                <circle cx="77" cy="225" r="3.2" />
              </g>
              <g className="arc-extension-dots arc-extension-dots-right">
                <circle cx="587" cy="195" r="3.2" />
                <circle cx="599" cy="205" r="3.2" />
                <circle cx="611" cy="215" r="3.2" />
                <circle cx="623" cy="225" r="3.2" />
              </g>
              <circle className="arc-marker arc-marker-left" cx="64" cy="236" r="9" />
              <circle className="arc-marker arc-marker-right" cx="636" cy="236" r="9" />
              <circle className="arc-today-halo" cx="350" cy="97" r="20" />
              <circle className="arc-today" cx="350" cy="97" r="11" filter="url(#todayGlow)" />
            </svg>
          </div>

          <div className="hero-confidence" aria-label={`Prediction confidence ${prediction.reliability} percent`}>
            <span>Prediction confidence</span>
            <strong>{prediction.reliability}%</strong>
          </div>
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

          <p className="device-privacy-note">Entries stay on this device.</p>
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

        <section className="safety-card card">
          <strong>Pattern estimate, not medical advice</strong>
          <p>Lynera only detects recurring timing patterns in your entries. Seek professional advice for severe, new, worsening, or disruptive symptoms.</p>
        </section>
      </div>
    </main>
  );
}
