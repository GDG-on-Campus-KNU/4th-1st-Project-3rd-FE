import { SVGComponentProp } from '@_/types/props';

export default function HamburgerSVG(props: SVGComponentProp) {
  const { width, height, color, ...restProps } = props;

  return (
    <svg
      width={width || '24'}
      height={height || '25'}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M23.1429 3.12488H0.857178"
        stroke={color || '#606060'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.1429 12.1249H0.857178"
        stroke={color || '#606060'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.1429 21.1249H0.857178"
        stroke={color || '#606060'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
