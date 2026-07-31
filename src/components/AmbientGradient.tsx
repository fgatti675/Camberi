import { NeatCanvas } from './NeatCanvas';
import type { NeatConfig } from './neatConfigs';

interface AmbientGradientProps {
  config: NeatConfig;
  /** Height of the canvas, anchored to the top of its section. */
  className?: string;
}

/**
 * A transparent NEAT canvas sitting inside a dark section, so the gradient
 * becomes the texture of that section rather than a separate band of colour
 * cutting across the page.
 *
 * The canvas is anchored to the top and is taller than the ribbon inside it,
 * so the shape fades into transparency well before the canvas ends and there
 * is never a visible cut edge along the bottom.
 */
export function AmbientGradient({ config, className = 'h-[44rem]' }: AmbientGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 ${className}`}>
      <NeatCanvas config={config} parallax parallaxStrength={0.04} />
    </div>
  );
}
