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
    <footer className="footer footer-dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="footer__logo">camberi</a>
            <p className="footer__tagline">
              A product engineering studio in Madrid. We design, build and ship
              software that earns its keep.
            </p>
          </div>

          <div className="footer__cols">
            {columns.map((col) => (
              <div key={col.title} className="footer__col">
                <h4 className="footer__col-title">{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Camberi. All rights reserved.</p>
          <p>Made in Madrid</p>
        </div>
      </div>
    </footer>
  );
}
