import { NeatCanvas } from './NeatCanvas';
import type { NeatConfig } from './neatConfigs';

interface AmbientGradientProps {
  config: NeatConfig;
  /** Height of the canvas, anchored to the top of its section. */
  className?: string;
  /** How hard the ribbon travels as the band crosses the viewport. */
  strength?: number;
}

/**
 * A transparent NEAT canvas sitting inside a dark section, so the gradient
 * becomes the texture of that section rather than a separate band of colour
 * cutting across the page.
 *
 * The canvas is anchored to the top and is taller than the ribbon inside it,
 * so the shape fades into transparency well before the canvas ends and there
 * is never a visible cut edge along the bottom.
 *
 * The offset is element-relative, not absolute scroll — the same thing the
 * dividers on rebase.pro do. It matters more than it sounds: with absolute
 * `scrollY` the contact band was reading a yOffset of roughly 240 by the time
 * anyone saw it, which is far outside the range these cameras were composed
 * for, and the ribbon had drifted out of frame. That is what made the lower
 * bands look like dark mud rather than art. Tying the offset to the band's own
 * position means every band travels through the same composed range, wherever
 * it happens to sit on the page.
 */
export function AmbientGradient({
  config,
  className = 'h-[44rem]',
  strength = 0.26,
}: AmbientGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 ${className}`}>
      <NeatCanvas config={config} scrollLinked scrollLinkedStrength={strength} />
    </div>
  );
}
