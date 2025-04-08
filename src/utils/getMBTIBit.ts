export default function getMbtiBit(mbti: Mbti) {
  let bit = 0;
  if (mbti[0] === 'E') bit <<= 8;
  if (mbti[1] === 'N') bit <<= 4;
  if (mbti[2] === 'T') bit <<= 2;
  if (mbti[3] === 'J') bit <<= 1;
  return bit;
}
