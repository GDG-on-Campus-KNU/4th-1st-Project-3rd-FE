import { SVGComponentProp } from '@_/types/props';

export default function ISTPSonaSvg(props: SVGComponentProp) {
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
        d="M101.828 65.5594H114.487C130.428 65.5594 143.351 78.4825 143.351 94.424C143.351 97.6123 140.767 100.197 137.579 100.197H101.828V65.5594Z"
        fill="#DEDEDE"
      />
      <rect
        x="15.7548"
        y="0.196899"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="34.0502"
        y="20.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="34.0502"
        y="23.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="95.0731"
        cy="50.6754"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="15.5991" cy="55.121" r="15" fill="#7EA3FF" />
      <circle cx="63.9364" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="78.9364" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="93.9364" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <path
        d="M71.2509 57.9481L86.6224 62.0669"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55.3829 40.121L70.2162 44.0955"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M87.6564 44.0956L102.49 40.121"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M57.7997 50.1969H67.7997"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="108.823" cy="85.1969" r="15" fill="#7EA3FF" />
    </svg>
  );
}
