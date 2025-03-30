import { SVGComponentProp } from '@_/types/props';

interface SolidArrowSVGProps extends SVGComponentProp {
  direction: 'left' | 'right' | 'up' | 'down';
}
const rotate = {
  left: 0,
  up: 90,
  right: 180,
  down: 270,
};
export default function SolidArrowHeadSVG(props: SolidArrowSVGProps) {
  const { width, height, color, direction, ...restProps } = props;

  const transform = `rotate(${rotate[direction]})`;

  return (
    <svg
      width={width || '24'}
      height={height || '25'}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={transform}
      {...restProps}
    >
      <path
        d="M17.4012 0.982178L6.85838 11.525C6.77638 11.602 6.71103 11.6949 6.66636 11.7981C6.62168 11.9013 6.59863 12.0126 6.59863 12.125C6.59863 12.2375 6.62168 12.3487 6.66636 12.4519C6.71103 12.5551 6.77638 12.6481 6.85838 12.725L17.4012 23.2679"
        stroke={color || '#666666'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
