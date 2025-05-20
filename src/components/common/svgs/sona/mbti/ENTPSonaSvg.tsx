import { SVGComponentProp } from '@_/types/props';

export default function ENTPSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '126'}
      height={height || '101'}
      viewBox="0 -10 126 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M86.7366 65.4893H99.3955C115.337 65.4893 128.26 78.4124 128.26 94.3538C128.26 97.5421 125.675 100.127 122.487 100.127H86.7366V65.4893Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.66333"
        y="0.126953"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.9587"
        y="20.084"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.9587"
        y="23.084"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.7083"
        cy="50.6055"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="79.9817"
        cy="50.6055"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="36.345" cy="94.127" r="15" fill="#7EA3FF" />
      <circle cx="48.845" cy="10.627" r="2.5" fill="#7EA3FF" />
      <circle cx="63.845" cy="10.627" r="2.5" fill="#7EA3FF" />
      <circle cx="78.845" cy="10.627" r="2.5" fill="#7EA3FF" />
      <path
        d="M74.0413 44.9941L78.2034 43.4041C81.0405 42.3203 84.2286 42.6955 86.7366 44.4083V44.4083"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="89.5347" cy="94.127" r="15" fill="#7EA3FF" />
      <path
        d="M58.8043 61.0996C61.5386 61.2623 67.8863 61.2167 71.4019 59.7324"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.812 44.5776L54.2529 46.6333"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
