import { useEffect, useMemo, useState } from 'react';
import type { DailyPmsLog, PmsLogValue } from './types';
import { getAllLogs, saveLog, removeLog, saveRange, deleteAllData, getSetting, setSetting } from './lib/storage';
import { calculatePrediction } from './lib/prediction';
import { addDays, todayLocal } from './lib/date';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { CalendarScreen } from './screens/CalendarScreen';
import { Insights } from './screens/Insights';
import { Privacy } from './screens/Privacy';
import { Icon } from './components/Icons';
import './styles.css';

type Screen='home'|'calendar'|'insights'|'privacy';
const nav:[Screen,string,string][]=[['home','Today','home'],['calendar','Calendar','calendar'],['insights','Insights','chart'],['privacy','Privacy','shield']];
export default function App(){
 const [logs,setLogs]=useState<DailyPmsLog[]>([]); const [ready,setReady]=useState(false); const [onboarded,setOnboarded]=useState(false); const [screen,setScreen]=useState<Screen>('home');
 useEffect(()=>{Promise.all([getAllLogs(),getSetting<boolean>('onboarded')]).then(([l,o])=>{setLogs(l);setOnboarded(Boolean(o));setReady(true)})},[]);
 const end=todayLocal(); const start=useMemo(()=>logs.length?[...logs].sort((a,b)=>a.date.localeCompare(b.date))[0].date:addDays(end,-89),[logs,end]); const prediction=useMemo(()=>calculatePrediction(logs,start,end),[logs,start,end]);
 const onLog=async(date:string,value?:PmsLogValue)=>{if(value){const saved=await saveLog(date,value);setLogs(c=>[...c.filter(l=>l.date!==date),saved].sort((a,b)=>a.date.localeCompare(b.date)))}else{await removeLog(date);setLogs(c=>c.filter(l=>l.date!==date))}};
 const onRange=async(s:string,e:string)=>{await saveRange(s,e,'pms');setLogs(await getAllLogs())};
 if(!ready)return <div className="loading"><img src="./icons/icon-192.png" alt=""/><span>Opening Lynera…</span></div>;
 if(!onboarded)return <Onboarding onFinish={()=>{void setSetting('onboarded',true);setOnboarded(true)}}/>;
 return <div className="app-shell"><header className="topbar"><button className="brand" onClick={()=>setScreen('home')} aria-label="Go to Today"><img src="./icons/icon-64.png" alt=""/><strong>LYNERA</strong></button></header>
 {screen==='home'&&<Home logs={logs} prediction={prediction} onLog={onLog}/>} {screen==='calendar'&&<CalendarScreen logs={logs} prediction={prediction} onLog={onLog} onRange={onRange}/>} {screen==='insights'&&<Insights prediction={prediction}/>} {screen==='privacy'&&<Privacy logs={logs} onDeleteAll={async()=>{await deleteAllData();setLogs([]);setOnboarded(false)}}/>}
 <nav className="bottom-nav" aria-label="Primary navigation">{nav.map(([id,label,icon])=><button key={id} onClick={()=>setScreen(id)} className={screen===id?'active':''} aria-current={screen===id?'page':undefined}><Icon name={icon}/><span>{label}</span></button>)}</nav></div>
}
