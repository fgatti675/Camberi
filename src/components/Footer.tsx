const columns = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'FireCMS', href: 'https://firecms.co' },
      { label: 'Rebase', href: 'https://rebase.pro' },
      { label: 'MedicalMotion', href: 'https://medicalmotion.com' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'hello@camberi.com', href: 'mailto:hello@camberi.com' },
      { label: 'GitHub', href: 'https://github.com/firecmsco' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi' },
      { label: 'X / Twitter', href: 'https://x.com/firecms_co' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white/60 py-20 pb-10 border-t border-white/6">
      <div className="max-w-[72rem] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 min-[820px]:grid-cols-[1.3fr_2fr] gap-12 pb-12">
          <div className="flex flex-col">
            <a href="#top" className="text-[1.3rem] font-600 text-white tracking-[-0.03em] hover:opacity-90 transition-opacity">camberi</a>
            <p className="mt-3.5 text-white/45 max-w-[22rem] text-[0.95rem] leading-[1.55]">
              A product engineering studio in Madrid. We design, build and ship
              software that earns its keep.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className="text-[0.8rem] font-600 text-white/35 uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white/50 text-[0.92rem] transition-colors duration-200 hover:text-white">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 mt-2 border-t border-white/6 flex justify-between flex-wrap gap-2 max-[520px]:justify-center max-[520px]:text-center">
          <p className="text-white/30 text-[0.85rem]">© {new Date().getFullYear()} Camberi. All rights reserved.</p>
          <p className="text-white/30 text-[0.85rem]">Made in Madrid</p>
        </div>
      </div>
    </footer>
  );
}
