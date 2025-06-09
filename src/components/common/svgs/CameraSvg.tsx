import { SVGComponentProp } from '@_/types/props';

export default function CameraSVG(props: SVGComponentProp) {
  const { width, height, color, ...restProps } = props;

  return (
    <svg
      width={width || '36'}
      height={height || '37'}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M29.1429 15.1964C29.1429 14.7418 28.9622 14.3058 28.6408 13.9843C28.3193 13.6628 27.8832 13.4822 27.4286 13.4822H24L21.4286 10.0536H14.5714L12 13.4822H8.57143C8.11678 13.4822 7.68074 13.6628 7.35925 13.9843C7.03776 14.3058 6.85715 14.7418 6.85715 15.1964V25.4822C6.85715 25.9368 7.03776 26.3729 7.35925 26.6943C7.68074 27.0158 8.11678 27.1964 8.57143 27.1964H27.4286C27.8832 27.1964 28.3193 27.0158 28.6408 26.6943C28.9622 26.3729 29.1429 25.9368 29.1429 25.4822V15.1964Z"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 23.3393C20.1302 23.3393 21.8571 21.6124 21.8571 19.4821C21.8571 17.3519 20.1302 15.625 18 15.625C15.8698 15.625 14.1429 17.3519 14.1429 19.4821C14.1429 21.6124 15.8698 23.3393 18 23.3393Z"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
