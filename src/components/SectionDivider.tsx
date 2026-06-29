import { NeatCanvas } from './NeatCanvas';
import type { NeatConfig } from './neatConfigs';

interface SectionDividerProps {
  config: NeatConfig;
}

export function SectionDivider({ config }: SectionDividerProps) {
  return (
    <div
      className="relative z-10 h-[700px] -mt-56 -mb-48 pointer-events-none max-md:h-[480px] max-md:-mt-36 max-md:-mb-40"
      aria-hidden="true">
      {/* No scroll-linked yOffset: it reshapes the plane at every scroll
          position, which sooner or later pushes the ribbon past the canvas
          edge and visibly cuts it. The flow animation keeps it alive. */}
      <NeatCanvas config={config} />
    </div>
  );
}
