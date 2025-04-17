import { SVGComponentProp } from '@_/types/props';

export default function ENFPSonaSvg(props: SVGComponentProp) {
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
        d="M70.11 65.5594H82.769C98.71 65.5594 111.633 78.4825 111.633 94.424C111.633 97.6123 109.049 100.197 105.86 100.197H70.11V65.5594Z"
        fill="#DEDEDE"
      />
      <rect
        x="0"
        y="0.196899"
        width="126"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.332"
        y="20.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.332"
        y="23.1537"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.0815"
        cy="50.6754"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="79.355"
        cy="50.6754"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="0" cy="59.5773" r="15" fill="#7EA3FF" />
      <circle cx="126" cy="59.5773" r="15" fill="#7EA3FF" />
      <path
        d="M39.0615 42.3368L53.5424 40.5848"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M87.375 42.3368L72.8941 40.5848"
        stroke="#4849E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="48.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="63.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <circle cx="78.2183" cy="10.6969" r="2.5" fill="#7EA3FF" />
      <path
        d="M62.6926 56.0006C63.0149 55.8013 63.4221 55.8013 63.7444 56.0006L67.2592 58.1738C68.1159 58.7035 67.7406 60.0244 66.7334 60.0244H59.7037C58.6964 60.0244 58.3211 58.7035 59.1778 58.1738L62.6926 56.0006Z"
        fill="#4849E8"
      />
      <path
        d="M63.7444 62.1513C63.4221 62.3505 63.0149 62.3505 62.6926 62.1513L59.1778 59.9781C58.3211 59.4484 58.6964 58.1275 59.7037 58.1275L66.7334 58.1275C67.7406 58.1275 68.1159 59.4484 67.2592 59.9781L63.7444 62.1513Z"
        fill="#4849E8"
      />
    </svg>
  );
}
