import { SVGComponentProp } from '@_/types/props';

export default function ISTJSonaSvg(props: SVGComponentProp) {
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
        d="M59.8279 66.0809H72.4868C88.428 66.0809 101.351 79.004 101.351 94.9455C101.351 98.1338 98.767 100.718 95.578 100.718H59.8279V66.0809Z"
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
      <circle cx="33.332" cy="85.7184" r="15" fill="#7EA3FF" />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
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
