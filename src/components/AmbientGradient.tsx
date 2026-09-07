import { NeatCanvas } from './NeatCanvas';
import type { NeatConfig } from './neatConfigs';

interface AmbientGradientProps {
  config: NeatConfig;
  /** Height of the canvas, anchored to the top of its section. */
  className?: string;
  /** How hard the ribbon travels as the band crosses the viewport. */
  strength?: number;
  /**
   * Tailwind mask classes that dissolve the canvas to transparent before the
   * section's copy begins — see the note below. Omit for a band whose ribbon
   * is dark enough for copy to sit on it.
   */
  mask?: string;
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
 *
 * `mask` is what keeps the copy legible on the coloured bands, and it works by
 * construction rather than by framing. The offset above means the ribbon moves
 * through the canvas as the reader scrolls, so no camera setting can promise
 * that the standfirst never lands on a yellow facet — but a mask that fades
 * the canvas to transparent above the heading can, at every offset and every
 * width. The section pays for it with top padding: the ribbon becomes a banner
 * across the top of the band and the copy starts on plain dark below it.
 */
export function AmbientGradient({
  config,
  className = 'h-[44rem]',
  strength = 0.26,
  mask = '',
}: AmbientGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 ${className} ${mask}`}>
      <NeatCanvas config={config} scrollLinked scrollLinkedStrength={strength} />
    </div>
  );
}
