import { SVGComponentProp } from '@_/types/props';

export default function HashTagSVG(props: SVGComponentProp) {
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
      <g clipPath="url(#clip0_706_6001)">
        <path
          d="M0.857178 7.71582H23.1429"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.857178 17.144H23.1429"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.2857 1.28711L15 23.5728"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.85725 1.28711L5.57153 23.5728"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_706_6001">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.430176)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
