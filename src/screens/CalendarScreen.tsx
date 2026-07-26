import { useState } from 'react';
import type { DailyPmsLog, PmsLogValue, PredictionResult } from '../types';
import { firstOfMonth, formatDate, todayLocal } from '../lib/date';
import { Calendar } from '../components/Calendar';
import { LogSheet } from '../components/LogSheet';
import { Icon } from '../components/Icons';
export function CalendarScreen({logs,prediction,onLog,onRange}:{logs:DailyPmsLog[];prediction:PredictionResult;onLog:(d:string,v?:PmsLogValue)=>void;onRange:(s:string,e:string)=>void}){
 const [month,setMonth]=useState(firstOfMonth(todayLocal())); const [selected,setSelected]=useState<string|null>(null); const [rangeOpen,setRangeOpen]=useState(false); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const value=selected?logs.find(l=>l.date===selected)?.value:undefined;
 const submitRange=()=>{if(start&&end&&start<=end){onRange(start,end);setRangeOpen(false);setMonth(firstOfMonth(start));setStart('');setEnd('')}};
 return <main className="screen"><div className="screen-heading"><div><p className="eyebrow">History & forecast</p><h1>Calendar</h1></div><button className="range-button" onClick={()=>setRangeOpen(true)}><Icon name="plus"/>Add past range</button></div><Calendar month={month} logs={logs} prediction={prediction} onMonthChange={setMonth} onSelectDate={setSelected}/><p className="calendar-help">Tap any date to add, edit, or remove its manual entry. Amber days are predictions only.</p>
 {selected&&<LogSheet date={selected} value={value} onClose={()=>setSelected(null)} onSave={v=>{onLog(selected,v);setSelected(null)}}/>}
 {rangeOpen&&<div className="sheet-backdrop"><section className="sheet" role="dialog" aria-modal="true"><div className="sheet-handle"/><button className="sheet-close" onClick={()=>setRangeOpen(false)}>×</button><p className="eyebrow">Historical cluster</p><h2>Add a range of PMS-like symptom days</h2><p>Every date in this range will be saved as a PMS-like symptom day and can be edited individually afterward.</p><label>Start date<input type="date" value={start} max={todayLocal()} onChange={e=>setStart(e.target.value)}/></label><label>End date<input type="date" value={end} min={start} max={todayLocal()} onChange={e=>setEnd(e.target.value)}/></label>{start&&end&&start<=end&&<p className="range-summary">{formatDate(start)} – {formatDate(end)}</p>}<button className="primary-button" disabled={!start||!end||start>end} onClick={submitRange}>Save PMS-like symptom range</button></section></div>}
 </main>
}
