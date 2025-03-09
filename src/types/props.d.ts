import { SVGProps } from 'react';

interface SVGComponentProp extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}
