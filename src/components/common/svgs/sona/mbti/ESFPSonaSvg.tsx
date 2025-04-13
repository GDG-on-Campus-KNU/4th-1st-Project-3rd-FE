import { SVGComponentProp } from '@_/types/props';

export default function ESFPSonaSvg(props: SVGComponentProp) {
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
        d="M101.153 66.0809H113.812C129.753 66.0809 142.676 79.004 142.676 94.9455C142.676 98.1338 140.092 100.718 136.903 100.718H101.153V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.0796"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.375"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.375"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.1245"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.3979"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="141.443" cy="26.2184" r="15" fill="#7EA3FF" />
      <path
        d="M53.7769 41.9803L68.2578 40.2284"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M102.746 41.9803L88.2647 40.2284"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="63.2612" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2612" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="93.2612" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="15.0796" cy="26.2184" r="15" fill="#7EA3FF" />
      <path
        d="M78.7386 63.591C78.4411 63.7525 78.082 63.7525 77.7845 63.591L69.9356 59.3308C69.0241 58.836 69.3755 57.4519 70.4126 57.4519L86.1104 57.4519C87.1475 57.4519 87.499 58.836 86.5875 59.3308L78.7386 63.591Z"
        fill="#4849E8"
      />
    </svg>
  );
}
