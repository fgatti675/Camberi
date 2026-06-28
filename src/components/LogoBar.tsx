const items = ['FireCMS', 'Rebase', 'MedicalMotion'];

export function LogoBar() {
  return (
    <section className="logobar">
      <div className="container">
        <p className="logobar__label reveal">Products we&apos;ve designed, built and run</p>
        <div className="logobar__row reveal d1">
          {items.map((item) => (
            <span key={item} className="logobar__item">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
