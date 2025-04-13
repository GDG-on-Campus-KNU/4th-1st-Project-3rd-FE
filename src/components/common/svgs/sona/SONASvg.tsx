import ENFJSonaSvg from './mbti/ENFJSonaSvg';
import ENFPSonaSvg from './mbti/ENFPSonaSvg';
import ENTJSonaSvg from './mbti/ENTJSonaSvg';
import ENTPSonaSvg from './mbti/ENTPSonaSvg';
import ESFJSonaSvg from './mbti/ESFJSonaSvg';
import ESFPSonaSvg from './mbti/ESFPSonaSvg';
import ESTJSonaSvg from './mbti/ESTJSonaSvg';
import ESTPSonaSvg from './mbti/ESTPSonaSvg';
import INFJSonaSvg from './mbti/INFJSonaSvg';
import INFPSonaSvg from './mbti/INFPSonaSvg';
import INTJSonaSvg from './mbti/INTJSonaSvg';
import INTPSonaSvg from './mbti/INTPSonaSvg';
import ISFJSonaSvg from './mbti/ISFJSonaSvg';
import ISFPSonaSvg from './mbti/ISFPSonaSvg';
import ISTJSonaSvg from './mbti/ISTJSonaSvg';
import ISTPSonaSvg from './mbti/ISTPSonaSvg';
import { Mbti } from '@_/types/type';
import { SVGComponentProp } from '@_/types/props';

export default function SONASvg(props: SVGComponentProp & { type: Mbti }) {
  const { type, ...restProps } = props;

  switch (type) {
    case 'ENFJ':
      return <ENFJSonaSvg {...restProps} />;
    case 'ENFP':
      return <ENFPSonaSvg {...restProps} />;
    case 'ENTJ':
      return <ENTJSonaSvg {...restProps} />;
    case 'ENTP':
      return <ENTPSonaSvg {...restProps} />;
    case 'ESFJ':
      return <ESFJSonaSvg {...restProps} />;
    case 'ESFP':
      return <ESFPSonaSvg {...restProps} />;
    case 'ESTJ':
      return <ESTJSonaSvg {...restProps} />;
    case 'ESTP':
      return <ESTPSonaSvg {...restProps} />;
    case 'INFJ':
      return <INFJSonaSvg {...restProps} />;
    case 'INFP':
      return <INFPSonaSvg {...restProps} />;
    case 'INTJ':
      return <INTJSonaSvg {...restProps} />;
    case 'INTP':
      return <INTPSonaSvg {...restProps} />;
    case 'ISFJ':
      return <ISFJSonaSvg {...restProps} />;
    case 'ISFP':
      return <ISFPSonaSvg {...restProps} />;
    case 'ISTJ':
      return <ISTJSonaSvg {...restProps} />;
    case 'ISTP':
      return <ISTPSonaSvg {...restProps} />;
    default:
      return null;
  }
}
