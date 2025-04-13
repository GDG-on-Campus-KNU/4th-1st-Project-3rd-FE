import { SVGComponentProp } from '@_/types/props';

export default function ISFJSonaSvg(props: SVGComponentProp) {
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
        d="M86.4934 66.0809H99.1523C115.094 66.0809 128.017 79.004 128.017 94.9455C128.017 98.1338 125.432 100.718 122.244 100.718H86.4934V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.420166"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.7156"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.7156"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.4651"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="79.7385"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="48.6018" cy="94.7184" r="15" fill="#7EA3FF" />
      <circle cx="78.6018" cy="94.7184" r="15" fill="#7EA3FF" />
      <path
        d="M39.4451 47.4615L53.926 45.7096"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M87.7585 47.4615L73.2776 45.7096"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.6018" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.6018" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.6018" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M61.7715 57.8621C62.8093 56.918 64.3948 56.918 65.4326 57.8621C67.2718 59.535 66.0883 62.595 63.6021 62.595C61.1158 62.595 59.9323 59.535 61.7715 57.8621Z"
        fill="#4849E8"
      />
    </svg>
  );
}
