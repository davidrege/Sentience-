import CycleWheel from './components/CycleWheel'
import AnimatedHeading from './components/AnimatedHeading'
import FadeIn from './components/FadeIn'
import AnimatedRule from './components/AnimatedRule'

export default function Home() {
  return (
    <div className="mono-wrap">

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3lh' }}>
        <span style={{ fontSize: '0.85rem', color: '#777', fontFamily: "ui-monospace,'SF Mono',monospace" }}>[ sentience ]</span>
        <span style={{ fontSize: '0.85rem', color: '#aaa', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
          <a href="#about">about</a>
          {' · '}
          <a href="#features">features</a>
          {' · '}
          <a href="#contact">contact</a>
        </span>
      </nav>

      {/* Hero */}
      <section style={{ marginBottom: '1lh' }}>
        <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1lh', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
          001 / introduction
        </p>
        <AnimatedHeading />
        <p style={{ maxWidth: '52ch', color: '#444', lineHeight: 1.7, fontSize: '0.9rem', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
          The next generation of intelligent systems —<br />
          aware, adaptive, and built for the future.
        </p>
      </section>

      <FadeIn delay={300}>
        <CycleWheel />
      </FadeIn>

      <AnimatedRule />

      {/* Features */}
      <FadeIn>
        <section id="features" style={{ marginBottom: '3lh' }}>
          <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1.5lh', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            002 / features
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            <tbody>
              {[
                ['01', 'Adaptive Intelligence', 'Systems that learn from context and evolve with your needs.'],
                ['02', 'Transparent Reasoning', 'Every decision is traceable — no black boxes.'],
                ['03', 'Human-Centered',         'Designed to augment human judgment, not replace it.'],
              ].map(([num, title, body]) => (
                <tr key={num} style={{ borderTop: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '1lh 2ch 1lh 0', color: '#aaa', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{num}</td>
                  <td style={{ padding: '1lh 3ch 1lh 0', verticalAlign: 'top', whiteSpace: 'nowrap', fontWeight: 500 }}>{title}</td>
                  <td style={{ padding: '1lh 0', color: '#555', verticalAlign: 'top' }}>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </FadeIn>

      <AnimatedRule />

      {/* About */}
      <FadeIn>
        <section id="about" style={{ marginBottom: '3lh' }}>
          <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1.5lh', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            003 / about
          </p>
          <p style={{ maxWidth: '60ch', lineHeight: 1.8, color: '#333', fontSize: '0.9rem', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            Sentience is an exploration at the intersection of machine intelligence
            and human awareness. The project is early — the ideas are evolving,
            and so is everything here.
          </p>
          <br />
          <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            &ldquo;A rhizome: a continuously growing underground stem which puts out
            lateral shoots and adventitious roots at intervals.&rdquo;
          </p>
        </section>
      </FadeIn>

      <AnimatedRule />

      {/* Contact */}
      <FadeIn>
        <section id="contact" style={{ marginBottom: '3lh' }}>
          <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1.5lh', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            004 / contact
          </p>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1lh', fontFamily: "ui-monospace,'SF Mono',monospace" }}>
            Interested in collaborating or learning more?
          </p>
          <a
            href="https://github.com/davidrege/Sentience-"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.85rem', fontFamily: "ui-monospace,'SF Mono',monospace" }}
          >
            github.com/davidrege/Sentience- →
          </a>
        </section>
      </FadeIn>

      {/* Footer */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#bbb',
        paddingTop: '1lh',
        borderTop: '1px solid #e5e5e5',
        fontFamily: "ui-monospace,'SF Mono',monospace",
      }}>
        <span>&copy; {new Date().getFullYear()} Sentience</span>
        <span>davidrege.github.io/Sentience-</span>
      </footer>

    </div>
  )
}
