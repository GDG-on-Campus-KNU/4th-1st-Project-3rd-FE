import { SVGComponentProp } from '@_/types/props';

export default function ENTPSonaSvg(props: SVGComponentProp) {
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
        d="M86.5369 66.0809H99.1958C115.137 66.0809 128.06 79.004 128.06 94.9455C128.06 98.1338 125.476 100.718 122.287 100.718H86.5369V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.463623"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.759"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.759"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.5085"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="79.782"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="36.1453" cy="94.7184" r="15" fill="#7EA3FF" />
      <circle cx="48.6453" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.6453" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.6453" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M73.8416 45.5856L78.0037 43.9955C80.8408 42.9117 84.0289 43.2869 86.5369 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="89.335" cy="94.7184" r="15" fill="#7EA3FF" />
      <path
        d="M58.6045 61.691C61.3389 61.8538 67.6865 61.8082 71.2021 60.3239"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.6123 45.1691L54.0532 47.2247"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
