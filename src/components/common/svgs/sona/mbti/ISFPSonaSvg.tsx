import { SVGComponentProp } from '@_/types/props';

export default function ISFPSonaSvg(props: SVGComponentProp) {
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
        d="M101.11 65.5594H113.769C129.71 65.5594 142.633 78.4825 142.633 94.424C142.633 97.6123 140.049 100.197 136.86 100.197H101.11V65.5594Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.0366"
        y="0.196899"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="33.332"
        y="20.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="33.332"
        y="23.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="62.0815"
        cy="50.6754"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="94.355"
        cy="50.6754"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.0366" cy="59.5773" r="15" fill="#7EA3FF" />
      <circle cx="141.4" cy="59.5773" r="15" fill="#7EA3FF" />
      <path
        d="M54.0615 42.3368L68.5424 40.5848"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M102.375 42.3368L87.8941 40.5848"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="63.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="93.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <path
        d="M77.6926 56.0006C78.0149 55.8013 78.4221 55.8013 78.7444 56.0006L82.2592 58.1738C83.1159 58.7035 82.7406 60.0244 81.7334 60.0244H74.7037C73.6964 60.0244 73.3211 58.7035 74.1778 58.1738L77.6926 56.0006Z"
        fill="#4849E8"
      />
      <path
        d="M78.7444 62.1513C78.4221 62.3505 78.0149 62.3505 77.6926 62.1513L74.1778 59.9781C73.3211 59.4484 73.6964 58.1275 74.7037 58.1275L81.7334 58.1275C82.7406 58.1275 83.1159 59.4484 82.2592 59.9781L78.7444 62.1513Z"
        fill="#4849E8"
      />
    </svg>
  );
}
