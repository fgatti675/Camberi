const items = ['FireCMS', 'Rebase', 'MedicalMotion'];

export function LogoBar() {
  return (
    <section className="py-20">
      <div className="max-w-[72rem] mx-auto px-6 lg:px-8 w-full">
        <p className="text-center text-[0.85rem] font-500 text-text-light tracking-[-0.005em] reveal">Our own products — built, shipped and maintained for years</p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-14 gap-y-5 reveal d1">
          {items.map((item) => (
            <span key={item} className="text-[1.4rem] font-600 tracking-[-0.03em] text-text-main opacity-35 transition-all duration-250 hover:opacity-100 cursor-default">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
