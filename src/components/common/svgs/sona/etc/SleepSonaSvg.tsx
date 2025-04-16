import { SVGComponentProp } from '@_/types/props';

export default function SleepSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '126'}
      height={height || '101'}
      viewBox="-15 0 156 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M86.7749 65.7969H99.4338C115.375 65.7969 128.298 78.72 128.298 94.6614C128.298 97.8497 125.714 100.434 122.525 100.434H86.7749V65.7969Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.70166"
        y="0.43457"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.9971"
        y="20.3916"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.9971"
        y="23.3916"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle cx="15.7017" cy="92.3999" r="15" fill="#7EA3FF" />
      <circle cx="48.8833" cy="10.9346" r="2.5" fill="#7EA3FF" />
      <circle cx="63.8833" cy="10.9346" r="2.5" fill="#7EA3FF" />
      <circle cx="78.8833" cy="10.9346" r="2.5" fill="#7EA3FF" />
      <circle cx="42.7466" cy="92.3999" r="15" fill="#7EA3FF" />
      <path
        d="M87.2446 51.9402L85.9285 53.2563C82.8043 56.3805 77.739 56.3805 74.6148 53.2563L73.2987 51.9402"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M54.4683 51.9402L53.1521 53.2563C50.0279 56.3805 44.9626 56.3805 41.8385 53.2563L40.5224 51.9402"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M62.053 57.0919C63.0908 56.1479 64.6763 56.1479 65.7141 57.0919C67.5533 58.7649 66.3698 61.8248 63.8835 61.8248C61.3973 61.8248 60.2138 58.7649 62.053 57.0919Z"
        fill="#4849E8"
      />
    </svg>
  );
}
