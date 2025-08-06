import { SVGComponentProp } from '@_/types/props';

export default function INFPSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '126'}
      height={height || '101'}
      viewBox="-10 -10 146 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M55.4934 66.0811H68.1523C84.094 66.0811 97.017 79.0042 97.017 94.9456C97.017 98.1339 94.432 100.719 91.244 100.719H55.4934V66.0811Z"
        fill="#DEDEDE"
      />
      <rect
        x="0"
        y="0.718506"
        width="126"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.332"
        y="20.6753"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.332"
        y="23.6753"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <path
        d="M57.0936 60.0518V60.0518C60.9989 63.957 67.4384 63.957 71.3436 60.0518V60.0518"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="47.0815"
        cy="51.197"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="79.355" cy="51.197" r="4.5" fill="#4849E8" stroke="#4849E8" />
      <circle cx="15" cy="51.197" r="15" fill="#7EA3FF" />
      <circle cx="48.2183" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2185" r="2.5" fill="#7EA3FF" />
      <circle cx="111" cy="51.197" r="15" fill="#7EA3FF" />
      <path
        d="M39.363 43.9695L53.8439 42.2175"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M88.332 43.9695L73.8509 42.2175"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
