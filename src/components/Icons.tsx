export function Icon({name,size=22}:{name:string;size?:number}){const p={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
if(name==='home')return <svg {...p}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>;
if(name==='calendar')return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
if(name==='chart')return <svg {...p}><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/></svg>;
if(name==='shield')return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>;
if(name==='plus')return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
if(name==='chevron-left')return <svg {...p}><path d="m15 18-6-6 6-6"/></svg>;
if(name==='chevron-right')return <svg {...p}><path d="m9 18 6-6-6-6"/></svg>;
if(name==='download')return <svg {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 21h14"/></svg>;
return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>}
