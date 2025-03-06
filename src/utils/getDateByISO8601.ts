export default function getDateByISO8601(iso8601: string) {
  if (iso8601.charAt(-1) === 'Z') iso8601 = iso8601.slice(0, -1);
  if (iso8601.includes('.')) {
    const dotIndex = iso8601.indexOf('.');
    iso8601 = iso8601.slice(0, dotIndex);
  }
  const [date, time] = iso8601.split('T');
  if (!date || !time) throw new Error('ISO-8601 형식이 맞지 않습니다');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute, second] = time.split(':').map(Number);
  const result = new Date();
  result.setFullYear(year);
  result.setMonth(month - 1);
  result.setDate(day);

  result.setHours(hour);
  result.setMinutes(minute);
  result.setSeconds(second);

  return result;
}
