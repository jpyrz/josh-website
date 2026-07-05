import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export default function Image({ priority: _priority, ...props }: ImageProps) {
  void _priority;

  // This file is a Cypress-only mock for Next Image; production code still uses next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || ""} />;
}
