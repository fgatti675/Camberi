import { NeatCanvas } from './NeatCanvas';
import type { NeatConfig } from './neatConfigs';

interface SectionDividerProps {
  config: NeatConfig;
}

export function SectionDivider({ config }: SectionDividerProps) {
  return (
    <div className="neat-divider" aria-hidden="true">
      <NeatCanvas config={config} scrollLinked scrollLinkedStrength={0.3} />
    </div>
  );
}
