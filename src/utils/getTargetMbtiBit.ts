import { MBTI_LIST } from '@_/constants/mbti';
import getMbtiBit from './getMBTIBit';

export default function getTargetMbtiBit(bit: number) {
  const result: Mbti[] = [];
  MBTI_LIST.forEach((mbti) => {
    const nowBit = getMbtiBit(mbti);
    if (nowBit & bit) result.push(mbti);
  });

  return result;
}
