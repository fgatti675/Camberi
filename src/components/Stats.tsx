import { CONTAINER, SECTION_BEFORE_DIVIDER } from './ui';

const stats = [
  { value: '10+', label: 'Years building products' },
  { value: '10k+', label: 'Projects powered by our software' },
  { value: '3', label: 'Products of our own, in production' },
  { value: '100%', label: 'Senior, in-house team' },
];

export function Stats() {
  return (
    <section className={`${SECTION_BEFORE_DIVIDER} bg-bg-main border-t border-hairline-soft`}>
      <div className={CONTAINER}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center reveal d${i + 1}`}>
              <div className="text-[2.75rem] md:text-[3.5rem] font-600 tracking-[-0.04em] leading-none text-text-main">{s.value}</div>
              <div className="mt-3 text-[0.92rem] leading-snug text-text-muted max-w-[12rem] mx-auto">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
