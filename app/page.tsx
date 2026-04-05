export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <span className="text-xl font-semibold tracking-tight">Sentience</span>
        <div className="flex gap-6 text-sm text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-sm uppercase tracking-widest text-white/40">Introducing</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Sentience
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
            The next generation of intelligent systems — aware, adaptive, and built for the future.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <a
              href="#about"
              className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors text-sm"
            >
              Learn more
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 rounded-full hover:border-white/50 transition-colors text-sm text-white/70 hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center tracking-tight">Built different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Adaptive Intelligence",
                body: "Systems that learn from context and evolve with your needs in real time.",
              },
              {
                title: "Transparent Reasoning",
                body: "Every decision is traceable — no black boxes, just clear and auditable logic.",
              },
              {
                title: "Human-Centered",
                body: "Designed to augment human judgment, not replace it.",
              },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-24 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">About</h2>
          <p className="text-white/50 leading-relaxed">
            Sentience is an exploration at the intersection of machine intelligence and human awareness.
            This project is early — the ideas are evolving, and so is everything here.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-24 border-t border-white/10">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Say hello</h2>
          <p className="text-white/50 text-sm">Interested in collaborating or learning more?</p>
          <a
            href="https://github.com/davidrege/Sentience-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-3 border border-white/20 rounded-full text-sm text-white/70 hover:text-white hover:border-white/50 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-white/10 text-center text-white/30 text-xs">
        &copy; {new Date().getFullYear()} Sentience. All rights reserved.
      </footer>
    </main>
  );
}
