import { SVGComponentProp } from '@_/types/props';

export default function INTJSonaSvg(props: SVGComponentProp) {
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
      <circle cx="15" cy="80.9457" r="15" fill="#7EA3FF" />
      <path
        d="M55.4934 66.0809H68.1523C84.094 66.0809 97.017 79.004 97.017 94.9455C97.017 98.1338 94.432 100.718 91.244 100.718H55.4934V66.0809Z"
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
      <circle cx="80.2878" cy="80.9457" r="15" fill="#7EA3FF" />
      <path
        d="M35.7996 45.5577L50.2405 47.6134"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M84.073 45.5577L69.6321 47.6134"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="11.2184" r="2.5" fill="#7EA3FF" />
      <path
        d="M59.2636 56.809C59.6451 56.462 60.2279 56.462 60.6094 56.809L65.0576 60.8552C65.7337 61.4702 65.2986 62.595 64.3848 62.595H55.4883C54.5744 62.595 54.1394 61.4702 54.8154 60.8552L59.2636 56.809Z"
        fill="#4849E8"
      />
    </svg>
  );
}
