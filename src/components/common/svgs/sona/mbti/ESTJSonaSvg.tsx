import { SVGComponentProp } from '@_/types/props';

export default function ESTJSonaSvg(props: SVGComponentProp) {
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
        d="M101.297 66.0809H113.956C129.897 66.0809 142.821 79.004 142.821 94.9455C142.821 98.1338 140.236 100.718 137.048 100.718H101.297V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.2239"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.5193"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.5193"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.2688"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.5422"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.2239" cy="46.515" r="15" fill="#7EA3FF" />
      <circle cx="63.4055" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.4055" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="93.4055" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="104.542" cy="83.3995" r="15" fill="#7EA3FF" />
      <path
        d="M68.9513 47.3114L55.5864 43.9703"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M87.9323 42.7294L101.297 39.3883"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M71.6207 60.6546L85.1909 63.0276"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
