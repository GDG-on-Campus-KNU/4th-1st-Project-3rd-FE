import { SVGComponentProp } from '@_/types/props';

export default function ENTJSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '126'}
      height={height || '101'}
      viewBox="-19 0 156 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle cx="111.792" cy="74.3959" r="15" fill="#7EA3FF" />
      <path
        d="M74.797 66.0809H87.456C103.397 66.0809 116.32 79.004 116.32 94.9455C116.32 98.1338 113.736 100.718 110.548 100.718H74.797V66.0809Z"
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
      <circle cx="0" cy="50.7184" r="15" fill="#7EA3FF" />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M53.4659 45.5856L49.3038 43.9955C46.4667 42.9117 43.2786 43.2869 40.7706 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74.1017 45.5856L78.2638 43.9955C81.1009 42.9117 84.289 43.2869 86.797 44.9997V44.9997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M59.1205 60.5289H68.6908"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
