import { SVGComponentProp } from '@_/types/props';

export default function ENTPSonaSvg(props: SVGComponentProp) {
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
        d="M59.5369 66.0809H72.1958C88.137 66.0809 101.06 79.004 101.06 94.9455C101.06 98.1338 98.476 100.718 95.287 100.718H59.5369V66.0809Z"
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
      <circle cx="21.1453" cy="94.7184" r="15" fill="#7EA3FF" />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M58.8416 45.5856L63.0037 43.9955C65.8408 42.9117 69.0289 43.2869 71.5369 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="74.335" cy="94.7184" r="15" fill="#7EA3FF" />
      <path
        d="M43.6045 61.691C46.3389 61.8538 52.6865 61.8082 56.2021 60.3239"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.6123 45.1691L39.0532 47.2247"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
