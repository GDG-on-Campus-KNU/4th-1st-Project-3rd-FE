import { SVGComponentProp } from '@_/types/props';

export default function SadSonaSvg(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '129'}
      height={height || '101'}
      viewBox="0 0 129 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M86.7749 66.2803H99.4338C115.375 66.2803 128.298 79.2034 128.298 95.1448C128.298 98.3331 125.714 100.918 122.525 100.918H86.7749V66.2803Z"
        fill="#DEDEDE"
      />
      <rect
        x="0.70166"
        y="0.917969"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="18.9971"
        y="20.875"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="18.9971"
        y="23.875"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="47.7466"
        cy="66.3965"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="43.7466"
        cy="70.5005"
        r="2.04102"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="84.02"
        cy="70.5005"
        r="2.04102"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="80.02" cy="66.3965" r="4.5" fill="#4849E8" stroke="#4849E8" />
      <circle cx="27.7466" cy="85.918" r="15" fill="#7EA3FF" />
      <circle cx="100.02" cy="85.918" r="15" fill="#7EA3FF" />
      <circle cx="48.8833" cy="11.418" r="2.5" fill="#7EA3FF" />
      <circle cx="63.8833" cy="11.418" r="2.5" fill="#7EA3FF" />
      <circle cx="78.8833" cy="11.418" r="2.5" fill="#7EA3FF" />
      <path
        d="M63.2107 72.0086C63.5921 71.6616 64.1749 71.6616 64.5564 72.0086L69.0047 76.0548C69.6807 76.6698 69.2457 77.7946 68.3318 77.7946H59.4353C58.5214 77.7946 58.0864 76.6698 58.7624 76.0548L63.2107 72.0086Z"
        fill="#4849E8"
      />
    </svg>
  );
}
