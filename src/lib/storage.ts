import { openDB } from 'idb';
import type { DailyPmsLog, PmsLogValue } from '../types';
const dbPromise=openDB('lynera-db',1,{upgrade(db){ if(!db.objectStoreNames.contains('logs')) db.createObjectStore('logs',{keyPath:'date'}); if(!db.objectStoreNames.contains('settings')) db.createObjectStore('settings'); }});
export async function getAllLogs():Promise<DailyPmsLog[]>{ return (await (await dbPromise).getAll('logs')).sort((a,b)=>a.date.localeCompare(b.date)); }
export async function saveLog(date:string,value:PmsLogValue):Promise<DailyPmsLog>{ const db=await dbPromise; const old=await db.get('logs',date) as DailyPmsLog|undefined; const now=new Date().toISOString(); const next={date,value,createdAt:old?.createdAt??now,updatedAt:now}; await db.put('logs',next); return next; }
export async function removeLog(date:string){ await (await dbPromise).delete('logs',date); }
export async function saveRange(start:string,end:string,value:PmsLogValue){ const db=await dbPromise; const tx=db.transaction('logs','readwrite'); const now=new Date().toISOString(); const { enumerateDates }=await import('./date'); for(const date of enumerateDates(start,end)){ const old=await tx.store.get(date) as DailyPmsLog|undefined; await tx.store.put({date,value,createdAt:old?.createdAt??now,updatedAt:now}); } await tx.done; }
export async function getSetting<T>(key:string):Promise<T|undefined>{ return (await (await dbPromise).get('settings',key)) as T|undefined; }
export async function setSetting<T>(key:string,value:T){ await (await dbPromise).put('settings',value,key); }
export async function deleteAllData(){ const db=await dbPromise; const tx=db.transaction(['logs','settings'],'readwrite'); await Promise.all([tx.objectStore('logs').clear(),tx.objectStore('settings').clear(),tx.done]); }
