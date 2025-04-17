import { SVGComponentProp } from '@_/types/props';

export default function INTPSonaSvg(props: SVGComponentProp) {
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
        d="M59.4934 66.0809H72.1523C88.094 66.0809 101.017 79.004 101.017 94.9455C101.017 98.1338 98.432 100.718 95.244 100.718H59.4934V66.0809Z"
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
      <circle cx="15" cy="50.7184" r="15" fill="#7EA3FF" />
      <circle cx="111" cy="80.9457" r="15" fill="#7EA3FF" />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M62.5019 57.4211C63.2649 56.727 64.4305 56.727 65.1935 57.4211L68.9688 60.8552C69.6448 61.4702 69.2098 62.595 68.2959 62.595H59.3994C58.4856 62.595 58.0505 61.4702 58.7265 60.8552L62.5019 57.4211Z"
        fill="#4849E8"
      />
      <path
        d="M53.408 45.5856L49.2458 43.9955C46.4087 42.9117 43.2206 43.2869 40.7126 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74.0437 45.5856L78.2058 43.9955C81.0429 42.9117 84.231 43.2869 86.739 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
