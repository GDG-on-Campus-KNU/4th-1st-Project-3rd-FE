import { SVGComponentProp } from '@_/types/props';

export default function ESFPSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '126'}
      height={height || '101'}
      viewBox="0 0 126 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M74.153 66.0809H86.812C102.753 66.0809 115.676 79.004 115.676 94.9455C115.676 98.1338 113.092 100.718 109.903 100.718H74.153V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="0"
        y="0.718384"
        width="126"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.332"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.332"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.0815"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="79.355"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="126" cy="26.2184" r="15" fill="#7EA3FF" />
      <path
        d="M38.7769 41.9803L53.2578 40.2284"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M87.746 41.9803L73.2647 40.2284"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="0" cy="26.2184" r="15" fill="#7EA3FF" />
      <path
        d="M63.7386 63.591C63.4411 63.7525 63.082 63.7525 62.7845 63.591L54.9356 59.3308C54.0241 58.836 54.3755 57.4519 55.4126 57.4519L71.1104 57.4519C72.1475 57.4519 72.499 58.836 71.5875 59.3308L63.7386 63.591Z"
        fill="#4849E8"
      />
    </svg>
  );
}
