'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MoveRight } from 'lucide-react';

/* ── Syntax tokens ── */
type Token = { text: string; color?: string };

const TOKENS: Token[] = [
  { text: '# Automating manual invoice processing', color: '#6A7A94' },
  { text: '\n' },
  { text: 'import', color: '#64FFDA' },
  { text: ' pandas ', color: '#C8D0E0' },
  { text: 'as', color: '#64FFDA' },
  { text: ' pd', color: '#C8D0E0' },
  { text: '\n' },
  { text: 'from', color: '#64FFDA' },
  { text: ' datawithusman ', color: '#7EC8E3' },
  { text: 'import', color: '#64FFDA' },
  { text: ' Pipeline', color: '#FFB86C' },
  { text: '\n\n' },
  { text: 'pipeline', color: '#C8D0E0' },
  { text: ' = ', color: '#64FFDA' },
  { text: 'Pipeline', color: '#FFB86C' },
  { text: '(', color: '#C8D0E0' },
  { text: 'source', color: '#8BE0A4' },
  { text: '=', color: '#64FFDA' },
  { text: '"invoices/"', color: '#F1FA8C' },
  { text: ')', color: '#C8D0E0' },
  { text: '\n' },
  { text: 'pipeline', color: '#C8D0E0' },
  { text: '.', color: '#C8D0E0' },
  { text: 'clean', color: '#8BE0A4' },
  { text: '()', color: '#C8D0E0' },
  { text: '\n' },
  { text: 'pipeline', color: '#C8D0E0' },
  { text: '.', color: '#C8D0E0' },
  { text: 'structure', color: '#8BE0A4' },
  { text: '()', color: '#C8D0E0' },
  { text: '\n' },
  { text: 'pipeline', color: '#C8D0E0' },
  { text: '.', color: '#C8D0E0' },
  { text: 'export', color: '#8BE0A4' },
  { text: '(', color: '#C8D0E0' },
  { text: 'to', color: '#8BE0A4' },
  { text: '=', color: '#64FFDA' },
  { text: '"dashboard"', color: '#F1FA8C' },
  { text: ')', color: '#C8D0E0' },
  { text: '\n\n' },
  { text: '# Result: 6 hrs manual work → 4 min', color: '#4F8EF7' },
];

const FULL_TEXT = TOKENS.map((t) => t.text).join('');

function renderTokens(revealed: number) {
  const nodes: React.ReactNode[] = [];
  let consumed = 0;

  for (let i = 0; i < TOKENS.length; i++) {
    const token = TOKENS[i];
    const remaining = revealed - consumed;
    if (remaining <= 0) break;

    const slice = token.text.slice(0, remaining);
    consumed += token.text.length;

    const parts = slice.split('\n');
    parts.forEach((part, pi) => {
      if (part) {
        nodes.push(
          <span key={`${i}-${pi}`} style={{ color: token.color ?? '#C8D0E0' }}>
            {part}
          </span>
        );
      }
      if (pi < parts.length - 1) {
        nodes.push(<br key={`br-${i}-${pi}`} />);
      }
    });
  }

  return nodes;
}

/* ── Stats ── */
const STATS = [
  { value: '25+', label: 'Projects Delivered' },
  { value: '10+', label: 'Industries Served' },
  { value: '100%', label: 'Remote' },
];

/* ── Animated terminal ── */
function Terminal() {
  const [revealed, setRevealed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = FULL_TEXT.length;
  const done = revealed >= total;

  useEffect(() => {
    if (revealed >= total) return;
    const ch = FULL_TEXT[revealed];
    const delay = ch === '\n' ? 40 : 28;
    timerRef.current = setTimeout(() => setRevealed((n) => n + 1), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [revealed, total]);

  return (
    <div
      style={{
        background: '#060A12',
        border: '1px solid #1E2D45',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow:
          '0 0 0 1px rgba(79,142,247,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(79,142,247,0.06)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.7rem 1rem',
          background: '#080E18',
          borderBottom: '1px solid #1E2D45',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.62rem',
            color: '#55647A',
            marginLeft: '0.5rem',
            letterSpacing: '0.06em',
          }}
        >
          pipeline.py — datawithusman
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: done ? '#28C840' : '#FEBC2E',
              boxShadow: done ? '0 0 6px rgba(40,200,64,0.8)' : '0 0 6px rgba(254,188,46,0.6)',
              animation: done ? 'none' : 'glow-pulse 1.2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.58rem',
              color: done ? '#28C840' : '#FEBC2E',
              letterSpacing: '0.08em',
            }}
          >
            {done ? 'done' : 'running'}
          </span>
        </div>
      </div>

      {/* Code area */}
      <div
        style={{
          padding: '1.4rem 1.5rem',
          minHeight: '15rem',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.8rem',
          lineHeight: '1.9',
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Line numbers */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: '#2A3A52',
              fontSize: '0.68rem',
              userSelect: 'none',
              lineHeight: '1.9',
              minWidth: '1.25rem',
              textAlign: 'right',
            }}
          >
            {FULL_TEXT.slice(0, Math.max(revealed, 1))
              .split('\n')
              .map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
          </div>

          {/* Code tokens */}
          <div style={{ flex: 1 }}>
            {renderTokens(revealed)}
            {/* Blinking cursor */}
            {!done && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.5rem',
                  height: '0.9em',
                  background: '#28C840',
                  verticalAlign: 'text-bottom',
                  marginLeft: '1px',
                  borderRadius: 1,
                  animation: 'blink 1s step-end infinite',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1.25rem',
          background: '#080E18',
          borderTop: '1px solid #1E2D45',
        }}
      >
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
            Python 3.11
          </span>
          <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
            UTF-8
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6rem',
            color: done ? '#64FFDA' : '#FEBC2E',
            letterSpacing: '0.06em',
          }}
        >
          {done ? '✓  Execution complete' : '●  Executing...'}
        </span>
      </div>
    </div>
  );
}

/* ── Framer variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ── Hero ── */
export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 64,
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial accent glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '15%', left: '35%',
          width: 640, height: 640,
          background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.07) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(1px)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', pointerEvents: 'none',
          bottom: '10%', right: '5%',
          width: 400, height: 400,
          background: 'radial-gradient(ellipse at center, rgba(100,255,218,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div
        className="section-container"
        style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '5rem', width: '100%' }}
      >
        <div className="hero-grid">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.38rem 0.9rem',
                  background: 'rgba(79,142,247,0.07)',
                  border: '1px solid rgba(79,142,247,0.2)',
                  borderRadius: 99,
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#64FFDA',
                    boxShadow: '0 0 8px rgba(100,255,218,0.9)',
                    animation: 'glow-pulse 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.65rem', color: '#4F8EF7',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}
                >
                  Open to Projects &amp; Opportunities
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
              style={{
                fontFamily: 'var(--font-syne)', fontWeight: 800,
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                lineHeight: 1.02, letterSpacing: '-0.03em',
                color: '#fff', marginBottom: '1.5rem',
              }}
            >
              Data Systems.<br />
              AI Solutions.<br />
              <span style={{ color: '#4F8EF7' }}>Built to Scale.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
              style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '1rem',
                lineHeight: 1.75, color: '#8B97B0',
                marginBottom: '2.25rem',
              }}
            >
              I'm Muhammad Usman — Data Scientist, AI Engineer, and Founder of{' '}
              <span style={{ color: '#C8D0E0', fontWeight: 500 }}>Data with Usman</span>.
              I build automation tools, intelligent dashboards, and data pipelines that help
              businesses eliminate manual work — and systems engineered to scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden" animate="visible" custom={0.3} variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3.5rem' }}
            >
              <Link href="/#projects" className="btn-primary">
                View My Work <ArrowRight size={14} />
              </Link>
              <Link href="/#contact" className="btn-ghost">
                Let's Work Together <MoveRight size={14} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden" animate="visible" custom={0.42} variants={fadeUp}
              style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}
            >
              {STATS.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-syne)', fontWeight: 800,
                      fontSize: '2rem', color: '#fff',
                      letterSpacing: '-0.03em', lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem',
                      color: '#55647A', letterSpacing: '0.14em',
                      textTransform: 'uppercase', marginTop: '0.3rem',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <Terminal />
          </motion.div>

        </div>
      </div>

      {/* Bottom separator */}
      <div className="divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}
