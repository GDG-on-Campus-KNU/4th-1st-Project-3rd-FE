import { SVGComponentProp } from '@_/types/props';

export default function FileClipboardSVG(props: SVGComponentProp) {
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
      <g clipPath="url(#clip0_706_5995)">
        <path
          d="M16.2856 3.00146H18.857C19.3117 3.00146 19.7477 3.18208 20.0692 3.50357C20.3907 3.82506 20.5713 4.26109 20.5713 4.71575V21.8586C20.5713 22.3133 20.3907 22.7493 20.0692 23.0708C19.7477 23.3923 19.3117 23.5729 18.857 23.5729H5.14275C4.6881 23.5729 4.25206 23.3923 3.93057 23.0708C3.60908 22.7493 3.42847 22.3133 3.42847 21.8586V4.71575C3.42847 4.26109 3.60908 3.82506 3.93057 3.50357C4.25206 3.18208 4.6881 3.00146 5.14275 3.00146H7.71418"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5713 1.28711H9.4284C8.48162 1.28711 7.71411 2.05462 7.71411 3.00139V3.85854C7.71411 4.80531 8.48162 5.57282 9.4284 5.57282H14.5713C15.518 5.57282 16.2855 4.80531 16.2855 3.85854V3.00139C16.2855 2.05462 15.518 1.28711 14.5713 1.28711Z"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.71411 15.0015L11.1427 17.573L15.4284 10.7158"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_706_5995">
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
