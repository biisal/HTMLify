import Link from "next/link";

const features = [
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
    title: "Shortlinks",
    desc: "Turn any link into a clean, shareable shortlink in one click.",
  },
  {
    title: "Temp file links",
    desc: "Quick, throwaway sharing for when you need a link, not a project.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="md:w-1/2">
            <span className="font-mono text-xs text-muted-foreground/60 tracking-widest uppercase">
              # capabilities
            </span>
            <h2 className="font-mono text-4xl lg:text-5xl text-foreground mt-3 mb-5 leading-[1.1] tracking-tight">
              Share anything, instantly.
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              Deploy and host your web projects in seconds. No config headaches,
              no lock-in - one platform for every stack.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="font-mono text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Browse files →
              </Link>
              <Link
                href="/dashboard/file/new"
                className="font-mono text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Start writing →
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2  rounded-md overflow-hidden">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card/40 hover:bg-card p-5 lg:p-6 group"
              >
                <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed mb-4">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
