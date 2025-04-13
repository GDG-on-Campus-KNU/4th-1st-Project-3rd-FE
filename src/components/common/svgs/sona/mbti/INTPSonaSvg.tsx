import { SVGComponentProp } from '@_/types/props';

export default function INTPSonaSvg(props: SVGComponentProp) {
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
        d="M101.739 66.0809H114.398C130.339 66.0809 143.262 79.004 143.262 94.9455C143.262 98.1338 140.678 100.718 137.49 100.718H101.739V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.6658"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.9612"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.9612"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.7107"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.9841"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.6658" cy="50.7184" r="15" fill="#7EA3FF" />
      <circle cx="99.199" cy="80.9457" r="15" fill="#7EA3FF" />
      <circle cx="63.8474" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.8474" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="93.8474" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M77.5019 57.4211C78.2649 56.727 79.4305 56.727 80.1935 57.4211L83.9688 60.8552C84.6448 61.4702 84.2098 62.595 83.2959 62.595H74.3994C73.4856 62.595 73.0505 61.4702 73.7265 60.8552L77.5019 57.4211Z"
        fill="#4849E8"
      />
      <path
        d="M68.408 45.5856L64.2458 43.9955C61.4087 42.9117 58.2206 43.2869 55.7126 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89.0437 45.5856L93.2058 43.9955C96.0429 42.9117 99.231 43.2869 101.739 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
