import { DOMAttributes } from 'react';
import NextImage from 'next/image';

export type ImageProps = DOMAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
