type ArrowDirection = "up-right" | "down-right" | "down" | "up";

const PATHS: Record<ArrowDirection, string> = {
  "up-right": "M5 19 19 5M8 5h11v11",
  "down-right": "M5 5 19 19M8 19h11V8",
  down: "M12 4v16m-6-6 6 6 6-6",
  up: "M12 20V4m-6 6 6-6 6 6",
};

/** SVG inline para que las flechas no dependan de fuentes ni se rendericen como emoji. */
export default function ArrowIcon({ direction }: { direction: ArrowDirection }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={PATHS[direction]} /></svg>;
}
