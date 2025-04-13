import { SVGComponentProp } from '@_/types/props';

export default function ENTJSonaSvg(props: SVGComponentProp) {
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
      <circle cx="138.792" cy="74.3959" r="15" fill="#7EA3FF" />
      <path
        d="M101.797 66.0809H114.456C130.397 66.0809 143.32 79.004 143.32 94.9455C143.32 98.1338 140.736 100.718 137.548 100.718H101.797V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.7238"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="34.0192"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="34.0192"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.7687"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="95.0421"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.7236" cy="50.7184" r="15" fill="#7EA3FF" />
      <circle cx="63.9054" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.9054" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="93.9054" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M68.4659 45.5856L64.3038 43.9955C61.4667 42.9117 58.2786 43.2869 55.7706 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89.1017 45.5856L93.2638 43.9955C96.1009 42.9117 99.289 43.2869 101.797 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74.1205 60.5289H83.6908"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
