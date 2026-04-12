'use client'

export default function AnimatedHeading() {
  return (
    <h1 style={{
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      fontSize: 'clamp(3rem, 10vw, 6.5rem)',
      fontWeight: 300,
      lineHeight: 0.95,
      letterSpacing: '-0.02em',
      marginBottom: '1.5lh',
    }}>
      {'SENTIENCE'.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: 'fadeUp 0.5s ease forwards',
            animationDelay: `${i * 55 + 80}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  )
}
