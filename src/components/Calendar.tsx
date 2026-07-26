import type { DailyPmsLog, PredictionResult } from '../types';
import { addMonths, firstOfMonth, formatDate, monthGrid, todayLocal } from '../lib/date';
import { Icon } from './Icons';
export function Calendar({month,logs,prediction,onMonthChange,onSelectDate}:{month:string;logs:DailyPmsLog[];prediction:PredictionResult;onMonthChange:(m:string)=>void;onSelectDate:(d:string)=>void}){
 const map=new Map(logs.map(l=>[l.date,l.value])); const today=todayLocal(); const inPred=(d:string)=>Boolean(prediction.predictedStart&&prediction.predictedEnd&&d>=prediction.predictedStart&&d<=prediction.predictedEnd);
 return <section className="calendar-card card">
  <div className="calendar-title"><button aria-label="Previous month" onClick={()=>onMonthChange(addMonths(month,-1))}><Icon name="chevron-left"/></button><h2>{formatDate(firstOfMonth(month),{month:'long',year:'numeric'})}</h2><button aria-label="Next month" onClick={()=>onMonthChange(addMonths(month,1))}><Icon name="chevron-right"/></button></div>
  <div className="weekdays">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><span key={d}>{d}</span>)}</div>
  <div className="month-grid">{monthGrid(month).map((date,i)=>date?<button key={date} onClick={()=>onSelectDate(date)} className={['day',map.get(date)==='pms'?'pms':'',map.get(date)==='no_pms'?'no-pms':'',inPred(date)?'predicted':'',date===today?'today':''].join(' ')} aria-label={`${formatDate(date)}${map.get(date)==='pms'?', PMS-like symptoms logged':map.get(date)==='no_pms'?', no symptoms logged':', no manual entry'}${inPred(date)?', predicted window':''}`}><span>{Number(date.slice(-2))}</span>{map.get(date)==='pms'&&<i className="pms-dot"/>}{map.get(date)==='no_pms'&&<i className="no-dot">✓</i>}{inPred(date)&&map.get(date)!=='pms'&&<i className="prediction-bar"/>}</button>:<span key={`blank-${i}`} className="day blank"/>)}</div>
  <div className="legend"><span><i className="legend-pms"/>Logged PMS-like symptoms</span><span><i className="legend-no"/>Logged no symptoms</span><span><i className="legend-pred"/>Predicted window</span><span><i className="legend-today"/>Today</span></div>
 </section>
}
