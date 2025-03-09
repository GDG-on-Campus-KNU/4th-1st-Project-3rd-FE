import { SVGProps } from 'react';

interface SVGElementProp extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}
