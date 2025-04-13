import { SVGComponentProp } from '@_/types/props';

export default function ESFJSonaSvg(props: SVGComponentProp) {
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
        d="M101.653 66.0809H114.312C130.253 66.0809 143.177 79.004 143.177 94.9455C143.177 98.1338 140.592 100.718 137.404 100.718H101.653V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.5798"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.8752"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.8752"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.6248"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.8982"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="141.944" cy="54.9315" r="15" fill="#7EA3FF" />
      <path
        d="M54.5404 45.6959L68.4946 41.4478"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M102.983 45.6959L89.0284 41.4478"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="63.7615" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.7615" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="93.7615" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="15.5798" cy="54.9315" r="15" fill="#7EA3FF" />
      <path
        d="M79.4346 62.8501C79.0531 63.1971 78.4703 63.1971 78.0888 62.8501L73.6406 58.8038C72.9646 58.1889 73.3996 57.0641 74.3135 57.0641L83.21 57.0641C84.1238 57.0641 84.5589 58.1889 83.8828 58.8038L79.4346 62.8501Z"
        fill="#4849E8"
      />
    </svg>
  );
}
