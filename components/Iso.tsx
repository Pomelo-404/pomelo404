import type { CSSProperties } from "react";

export type IsoVariant =
  | "slice"
  | "orbit"
  | "stamp"
  | "spark"
  | "pixel"
  | "seed";

type IsoProps = {
  variant?: IsoVariant;
  size?: number;
  className?: string;
};

export default function Iso({
  variant = "slice",
  size = 48,
  className = "",
}: IsoProps) {
  return (
    <span
      className={`iso iso--${variant} ${className}`.trim()}
      style={{ "--iso-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    />
  );
}
