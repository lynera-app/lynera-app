import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, parseLocalDate, toLocalDateString } from './date';
describe('local dates',()=>{
 it('handles leap years',()=>expect(addDays('2024-02-28',1)).toBe('2024-02-29'));
 it('handles month and year boundaries',()=>{expect(addDays('2026-01-31',1)).toBe('2026-02-01');expect(addDays('2026-12-31',1)).toBe('2027-01-01')});
 it('avoids UTC shifts',()=>expect(toLocalDateString(parseLocalDate('2026-07-24'))).toBe('2026-07-24'));
 it('counts DST calendar days',()=>expect(daysBetween('2026-03-28','2026-03-30')).toBe(2));
});
