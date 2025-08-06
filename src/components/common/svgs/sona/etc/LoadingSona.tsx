import { SVGComponentProp } from '@_/types/props';

export default function LoadingSona(props: SVGComponentProp) {
  const { width, height, ...restProps } = props;

  return (
    <svg
      width={width || '201'}
      height={height || '200'}
      viewBox="0 0 201 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M123.391 115.363H136.05C151.992 115.363 164.915 128.286 164.915 144.227C164.915 147.415 162.33 150 159.142 150H123.391V115.363Z"
        fill="#DEDEDE"
      />
      <rect
        x="37.3181"
        y="50"
        width="126.364"
        height="100"
        rx="40"
        fill="#F1F1F1"
      />
      <rect
        x="55.6135"
        y="69.9568"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#606060"
      />
      <rect
        x="55.6135"
        y="72.9568"
        width="89.7729"
        height="71.0433"
        rx="30"
        fill="#282828"
      />
      <circle
        cx="84.363"
        cy="100.479"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle
        cx="116.636"
        cy="100.479"
        r="4.5"
        fill="#4849E8"
        stroke="#4849E8"
      />
      <circle cx="85.4998" cy="60.5" r="2.5" fill="#7EA3FF" />
      <circle cx="100.5" cy="60.5" r="2.5" fill="#7EA3FF" />
      <circle cx="115.5" cy="60.5" r="2.5" fill="#7EA3FF" />
      <path
        d="M99.8271 106.09C100.209 105.743 100.791 105.743 101.173 106.09L105.621 110.136C106.297 110.751 105.862 111.876 104.948 111.876H96.0518C95.1379 111.876 94.7028 110.751 95.3789 110.136L99.8271 106.09Z"
        fill="#4849E8"
      />
      <circle cx="37.3181" cy="123.479" r="15" fill="#7EA3FF" />
      <circle cx="163.682" cy="123.479" r="15" fill="#7EA3FF" />
    </svg>
  );
}
