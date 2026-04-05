export default function Home() {
  return (
    <main style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }} className="min-h-screen bg-[#f5f5f3] text-[#111111]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#dddddd]">
        <span className="text-sm tracking-widest uppercase text-[#111111]">Sentience</span>
        <div style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="flex gap-8 text-xs text-[#888888]">
          <a href="#about" className="hover:text-[#111111] transition-colors">about</a>
          <a href="#features" className="hover:text-[#111111] transition-colors">features</a>
          <a href="#contact" className="hover:text-[#111111] transition-colors">contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-32 pb-24 border-b border-[#dddddd]">
        <div className="max-w-3xl">
          <p style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#888888] mb-6 tracking-widest uppercase">001 — Introduction</p>
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-light leading-[0.95] tracking-tight text-[#111111] mb-8">
            Sentience
          </h1>
          <p className="text-base text-[#555555] max-w-md leading-relaxed font-light">
            The next generation of intelligent systems — aware, adaptive, and built for the future.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-[#dddddd]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dddddd]">
          {[
            ["01", "Adaptive Intelligence", "Systems that learn from context and evolve with your needs in real time."],
            ["02", "Transparent Reasoning", "Every decision is traceable — no black boxes, just clear and auditable logic."],
            ["03", "Human-Centered", "Designed to augment human judgment, not replace it."],
          ].map(([num, title, body]) => (
            <div key={num} className="px-8 py-12 space-y-4">
              <p style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#888888]">{num}</p>
              <h3 className="text-sm font-medium text-[#111111]">{title}</h3>
              <p className="text-sm text-[#777777] leading-relaxed font-light">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-24 border-b border-[#dddddd]">
        <div className="max-w-2xl space-y-6">
          <p style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#888888] tracking-widest uppercase">002 — About</p>
          <p className="text-xl font-light text-[#333333] leading-relaxed">
            Sentience is an exploration at the intersection of machine intelligence and human awareness.
            This project is early — the ideas are evolving, and so is everything here.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-24 border-b border-[#dddddd]">
        <div className="space-y-6">
          <p style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#888888] tracking-widest uppercase">003 — Contact</p>
          <p className="text-sm text-[#555555] font-light">Interested in collaborating or learning more?</p>
          <a
            href="https://github.com/davidrege/Sentience-"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }}
            className="inline-flex items-center gap-3 text-xs text-[#111111] border-b border-[#111111] pb-0.5 hover:text-[#888888] hover:border-[#888888] transition-colors"
          >
            github.com/davidrege/Sentience- →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-5 flex items-center justify-between">
        <span style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#aaaaaa]">
          &copy; {new Date().getFullYear()} Sentience
        </span>
        <span style={{ fontFamily: "ui-monospace, 'SF Mono', monospace" }} className="text-xs text-[#aaaaaa]">
          davidrege.github.io/Sentience-
        </span>
      </footer>

    </main>
  );
}
