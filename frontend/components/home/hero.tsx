const cards = [
  {
    title: "One-click deploy",
    desc: "Deploy static sites and modern web apps to a global edge network in seconds - no config, no waiting.",
  },
  {
    title: "Any language",
    desc: "Python, HTML, JavaScript, Go, TypeScript, Rust and more. One platform for every stack.",
  },
  {
    title: "Share instantly",
    desc: "Share anything with a single link. Snippets, projects, and files ready to go.",
  },
  {
    title: "Shortlinks & temp links",
    desc: "Turn any link into a clean, shareable shortlink or a quick throwaway temp file link.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 md:py-28">
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-muted-foreground/60 tracking-widest uppercase">
            # deploy · host · share
          </span>

          <h1 className="mt-3 font-mono text-3xl  leading-[1.05] tracking-[-0.08em] text-foreground lg:text-5xl">
            Deploy anywhere. Share everywhere.
          </h1>

          <p className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            The ultimate platform for deploying and hosting your web projects.
            Launch static sites and modern web apps to a global edge network in
            seconds - no config, no waiting.
          </p>
        </div>

        <div className="mt-16 grid max-w-4xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  rounded-md overflow-hidden">
          {cards.map((c) => (
            <div key={c.title} className="   p-4 pl-0">
              <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
                {c.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
