import { SVGComponentProp } from '@_/types/props';

export default function INFPSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '157'}
      height={height || '101'}
      viewBox="0 0 157 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M101.739 66.0811H114.398C130.339 66.0811 143.262 79.0042 143.262 94.9456C143.262 98.1339 140.678 100.719 137.49 100.719H101.739V66.0811Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.6658"
        y="0.718506"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.9612"
        y="20.6753"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.9612"
        y="23.6753"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <path
        d="M72.0936 60.0518V60.0518C75.9989 63.957 82.4384 63.957 86.3436 60.0518V60.0518"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="62.7107"
        cy="51.197"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.9841"
        cy="51.197"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.6658" cy="51.197" r="15" fill="#7EA3FF" />
      <circle cx="63.8474" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="78.8474" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="93.8474" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="142.029" cy="51.197" r="15" fill="#7EA3FF" />
      <path
        d="M54.363 43.9695L68.8439 42.2175"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M103.332 43.9695L88.8509 42.2175"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
