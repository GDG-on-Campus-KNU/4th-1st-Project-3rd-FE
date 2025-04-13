import { SVGComponentProp } from '@_/types/props';

export default function INFJSonaSvg(props: SVGComponentProp) {
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
        d="M86.8279 65.5511H99.4868C115.428 65.5511 128.351 78.4742 128.351 94.4157C128.351 97.604 125.767 100.189 122.578 100.189H86.8279V65.5511Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.754639"
        y="0.188599"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="19.05"
        y="20.1454"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="19.05"
        y="23.1454"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.7996"
        cy="50.6671"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="80.073"
        cy="50.6671"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="86.8279" cy="80.4159" r="15" fill="#7EA3FF" />
      <path
        d="M39.7152 45.1661L53.6694 40.918"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M88.1573 45.1661L74.2032 40.918"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.9363" cy="10.6886" r="2.5" fill="#7EA3FF" />
      <circle cx="63.9363" cy="10.6886" r="2.5" fill="#7EA3FF" />
      <circle cx="78.9363" cy="10.6886" r="2.5" fill="#7EA3FF" />
      <path
        d="M59.8115 58.6671H68.0615"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38.6694" cy="80.4159" r="15" fill="#7EA3FF" />
    </svg>
  );
}
