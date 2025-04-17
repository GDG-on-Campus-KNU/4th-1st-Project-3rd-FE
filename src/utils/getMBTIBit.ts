export default function getMbtiBit(mbti: string): number {
  let bit = 0;

  switch (mbti) {
    case 'ISFP':
      bit = 1 << 0;
      break;
    case 'ISFJ':
      bit = 1 << 1;
      break;
    case 'ISTP':
      bit = 1 << 2;
      break;
    case 'ISTJ':
      bit = 1 << 3;
      break;
    case 'INFP':
      bit = 1 << 4;
      break;
    case 'INFJ':
      bit = 1 << 5;
      break;
    case 'INTP':
      bit = 1 << 6;
      break;
    case 'INTJ':
      bit = 1 << 7;
      break;
    case 'ESFP':
      bit = 1 << 8;
      break;
    case 'ESFJ':
      bit = 1 << 9;
      break;
    case 'ESTP':
      bit = 1 << 10;
      break;
    case 'ESTJ':
      bit = 1 << 11;
      break;
    case 'ENFP':
      bit = 1 << 12;
      break;
    case 'ENFJ':
      bit = 1 << 13;
      break;
    case 'ENTP':
      bit = 1 << 14;
      break;
    case 'ENTJ':
      bit = 1 << 15;
      break;
    default:
      bit = 0; // 유효하지 않은 MBTI
  }

  // 16비트 2진수 문자열로 변환, 0b 접두사 추가
  return bit;
}
