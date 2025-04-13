import { SVGComponentProp } from '@_/types/props';

export default function ISTJSonaSvg(props: SVGComponentProp) {
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
        d="M86.8279 66.0809H99.4868C115.428 66.0809 128.351 79.004 128.351 94.9455C128.351 98.1338 125.767 100.718 122.578 100.718H86.8279V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.754639"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="19.05"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="19.05"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.7996"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="80.073"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="34.05" cy="85.7184" r="15" fill="#7EA3FF" />
      <circle cx="48.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M55.9796 60.5289H71.8934"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.7996 46.1969H52.7996"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75.073 46.1969H85.073"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="93.823" cy="85.7184" r="15" fill="#7EA3FF" />
    </svg>
  );
}
