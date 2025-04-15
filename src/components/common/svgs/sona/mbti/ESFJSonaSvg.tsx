import { SVGComponentProp } from '@_/types/props';

export default function ESFJSonaSvg(props: SVGComponentProp) {
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
        d="M74.653 66.0809H87.312C103.253 66.0809 116.177 79.004 116.177 94.9455C116.177 98.1338 113.592 100.718 110.404 100.718H74.653V66.0809Z"
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
      <circle cx="126" cy="54.9315" r="15" fill="#7EA3FF" />
      <path
        d="M39.5404 45.6959L53.4946 41.4478"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M87.983 45.6959L74.0284 41.4478"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="0" cy="54.9315" r="15" fill="#7EA3FF" />
      <path
        d="M64.4346 62.8501C64.0531 63.1971 63.4703 63.1971 63.0888 62.8501L58.6406 58.8038C57.9646 58.1889 58.3996 57.0641 59.3135 57.0641L68.21 57.0641C69.1238 57.0641 69.5589 58.1889 68.8828 58.8038L64.4346 62.8501Z"
        fill="#4849E8"
      />
    </svg>
  );
}
