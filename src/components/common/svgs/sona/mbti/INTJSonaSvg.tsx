import { SVGComponentProp } from '@_/types/props';

export default function INTJSonaSvg(props: SVGComponentProp) {
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
      <circle cx="15.05" cy="80.9457" r="15" fill="#7EA3FF" />
      <path
        d="M97.8279 66.0809H110.487C126.428 66.0809 139.351 79.004 139.351 94.9455C139.351 98.1338 136.767 100.718 133.578 100.718H97.8279V66.0809Z"
        fill="#DEDEDE"
      />
      <rect
        x="11.7546"
        y="0.718384"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="30.05"
        y="20.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="30.05"
        y="23.6752"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="58.7996"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="91.073"
        cy="51.1969"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="95.2878" cy="80.9457" r="15" fill="#7EA3FF" />
      <path
        d="M50.7996 45.5577L65.2405 47.6134"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M99.073 45.5577L84.6321 47.6134"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="59.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="74.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="89.9363" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M74.2636 56.809C74.6451 56.462 75.2279 56.462 75.6094 56.809L80.0576 60.8552C80.7337 61.4702 80.2986 62.595 79.3848 62.595H70.4883C69.5744 62.595 69.1394 61.4702 69.8154 60.8552L74.2636 56.809Z"
        fill="#4849E8"
      />
    </svg>
  );
}
