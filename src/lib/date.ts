const DAY_MS = 86400000;
export function parseLocalDate(value: string): Date {
  const [y,m,d] = value.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear(); const m = String(date.getMonth()+1).padStart(2,'0'); const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
export function todayLocal(): string { return toLocalDateString(new Date()); }
export function addDays(value: string, amount: number): string { const date = parseLocalDate(value); date.setDate(date.getDate()+amount); return toLocalDateString(date); }
export function daysBetween(a: string,b: string): number { return Math.round((Date.UTC(...dateParts(b)) - Date.UTC(...dateParts(a))) / DAY_MS); }
function dateParts(value: string): [number,number,number] { const [y,m,d]=value.split('-').map(Number); return [y,m-1,d]; }
export function enumerateDates(start: string,end: string): string[] { const out=[]; for(let d=start; d<=end; d=addDays(d,1)) out.push(d); return out; }
export function formatDate(value: string, opts: Intl.DateTimeFormatOptions = { day:'numeric', month:'short', year:'numeric' }): string { return new Intl.DateTimeFormat('en-GB',opts).format(parseLocalDate(value)); }
export function monthKey(value: string): string { return value.slice(0,7); }
export function firstOfMonth(value: string): string { return `${value.slice(0,7)}-01`; }
export function addMonths(value: string, amount: number): string { const date=parseLocalDate(firstOfMonth(value)); date.setMonth(date.getMonth()+amount); return toLocalDateString(date); }
export function monthGrid(month: string): Array<string|null> {
  const first=parseLocalDate(firstOfMonth(month)); const y=first.getFullYear(), m=first.getMonth(); const mondayOffset=(first.getDay()+6)%7;
  const count=new Date(y,m+1,0).getDate(); const cells:Array<string|null>=Array(mondayOffset).fill(null);
  for(let d=1;d<=count;d++) cells.push(toLocalDateString(new Date(y,m,d,12)));
  while(cells.length%7) cells.push(null); return cells;
}
