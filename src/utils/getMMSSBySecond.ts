export default function getMMSSBySecond(second: number) {
  return `${Math.floor(second / 60)
    .toString()
    .padStart(2, '00')}:${(second % 60).toString().padStart(2, '00')}`;
}
