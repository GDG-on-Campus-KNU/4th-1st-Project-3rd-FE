import { SVGComponentProp } from '@_/types/props';

export default function PeopleCancelSVG(props: SVGComponentProp) {
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
      <g clipPath="url(#clip0_620_6064)">
        <path
          d="M8.57101 8.57122C10.7013 8.57122 12.4282 6.84432 12.4282 4.71408C12.4282 2.58384 10.7013 0.856934 8.57101 0.856934C6.44077 0.856934 4.71387 2.58384 4.71387 4.71408C4.71387 6.84432 6.44077 8.57122 8.57101 8.57122Z"
          stroke={color || '#FF321B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.57122 21.4283H0.856934V18.8568C0.856512 17.5058 1.21089 16.1784 1.88461 15.0074C2.55834 13.8364 3.52778 12.8628 4.69593 12.1842C5.86408 11.5055 7.18998 11.1455 8.54097 11.1402C9.89195 11.1349 11.2206 11.4845 12.3941 12.154"
          stroke={color || '#FF321B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.1426 15.874L15.874 23.1426"
          stroke={color || '#FF321B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.874 15.874L23.1426 23.1426"
          stroke={color || '#FF321B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_620_6064">
          <rect width={width || '24'} height={height || '24'} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
