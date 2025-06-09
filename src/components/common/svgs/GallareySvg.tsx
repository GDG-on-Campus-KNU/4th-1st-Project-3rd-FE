import { SVGComponentProp } from '@_/types/props';

export default function GallerySVG(props: SVGComponentProp) {
  const { width, height, color, ...restProps } = props;

  return (
    <svg
      width={width || '36'}
      height={height || '36'}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_825_6302)">
        <path
          d="M8.57142 29.7732L27.4286 29.7732C28.3753 29.7732 29.1429 29.0057 29.1429 28.0589L29.1429 9.20177C29.1429 8.25499 28.3753 7.48748 27.4286 7.48748L8.57142 7.48748C7.62465 7.48748 6.85714 8.25499 6.85714 9.20177L6.85714 28.0589C6.85714 29.0057 7.62465 29.7732 8.57142 29.7732Z"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.85715 25.4875H29.1429"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5829 25.4876L21.5143 17.1219C21.6683 16.9936 21.8624 16.9233 22.0629 16.9233C22.2633 16.9233 22.4574 16.9936 22.6114 17.1219L29.1429 21.8019"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.7143 16.9161C15.1344 16.9161 16.2857 15.7648 16.2857 14.3446C16.2857 12.9245 15.1344 11.7732 13.7143 11.7732C12.2941 11.7732 11.1429 12.9245 11.1429 14.3446C11.1429 15.7648 12.2941 16.9161 13.7143 16.9161Z"
          stroke={color || '#666666'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_825_6302">
          <rect
            width="24.2857"
            height="24.2857"
            fill="white"
            transform="translate(5.85715 6.48755)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
