const items = ['FireCMS', 'Rebase', 'MedicalMotion'];

export function LogoBar() {
  return (
    <section className="logobar">
      <div className="container">
        <p className="logobar__label reveal">Our own products — built, shipped and maintained for years</p>
        <div className="logobar__row reveal d1">
          {items.map((item) => (
            <span key={item} className="logobar__item">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
