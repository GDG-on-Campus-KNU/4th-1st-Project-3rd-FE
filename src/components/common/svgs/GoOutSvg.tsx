import { SVGComponentProp } from '@_/types/props';

export default function GoOutSVG(props: SVGComponentProp) {
  const { width, height, color, ...restProps } = props;

  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M16.2855 17.1426V21.4284C16.2855 21.883 16.1049 22.3191 15.7834 22.6405C15.4619 22.962 15.0259 23.1426 14.5712 23.1426H2.57122C2.11656 23.1426 1.68053 22.962 1.35904 22.6405C1.03755 22.3191 0.856934 21.883 0.856934 21.4284V2.57122C0.856934 2.11656 1.03755 1.68053 1.35904 1.35904C1.68053 1.03755 2.11656 0.856934 2.57122 0.856934H14.5712C15.0259 0.856934 15.4619 1.03755 15.7834 1.35904C16.1049 1.68053 16.2855 2.11656 16.2855 2.57122V6.85693"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4282 12H7.71387"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1424 8.57129L7.71387 11.9999L11.1424 15.4284"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
