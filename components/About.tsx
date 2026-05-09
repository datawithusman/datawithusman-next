'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Camera } from 'lucide-react';

function ProfilePhoto() {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '3/4', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: '#0D1422' }}>
      {/* Actual photo — hidden until loaded, removed on error */}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/profile.jpeg"
          alt="Muhammad Usman"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s',
          }}
        />
      )}

      {/* Placeholder — shown until photo loads or if missing */}
      {(!loaded || errored) && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.75rem', padding: '1.5rem', textAlign: 'center',
          background: '#0D1422',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(79,142,247,0.08)',
            border: '1px solid rgba(79,142,247,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Camera size={22} color="#4F8EF7" strokeWidth={1.5} />
          </div>
          <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A', letterSpacing: '0.06em', lineHeight: 1.6, margin: 0 }}>
            Add profile.jpg to<br />/public/images/
          </p>
        </div>
      )}

      {/* Gradient overlay */}
      <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 12, left: 12, width: 22, height: 22, borderTop: '2px solid rgba(79,142,247,0.6)', borderLeft: '2px solid rgba(79,142,247,0.6)', borderRadius: '3px 0 0 0', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderTop: '2px solid rgba(79,142,247,0.6)', borderRight: '2px solid rgba(79,142,247,0.6)', borderRadius: '0 3px 0 0', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 12, left: 12, width: 22, height: 22, borderBottom: '2px solid rgba(79,142,247,0.6)', borderLeft: '2px solid rgba(79,142,247,0.6)', borderRadius: '0 0 0 3px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 22, height: 22, borderBottom: '2px solid rgba(79,142,247,0.6)', borderRight: '2px solid rgba(79,142,247,0.6)', borderRadius: '0 0 3px 0', pointerEvents: 'none' }} />
    </div>
  );
}

/* ── Value pillars ── */
const PILLARS = [
  {
    icon: Zap,
    accent: '#4F8EF7',
    accentBg: 'rgba(79,142,247,0.08)',
    accentBorder: 'rgba(79,142,247,0.2)',
    label: 'Fast Delivery',
  },
  {
    icon: ShieldCheck,
    accent: '#64FFDA',
    accentBg: 'rgba(100,255,218,0.06)',
    accentBorder: 'rgba(100,255,218,0.18)',
    label: 'Production-Grade Quality',
  },
  {
    icon: Globe,
    accent: '#FFB86C',
    accentBg: 'rgba(255,184,108,0.07)',
    accentBorder: 'rgba(255,184,108,0.2)',
    label: '100% Remote',
  },
];

/* ── Framer variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--surface)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        overflow: 'hidden',
      }}
    >
      <div className="divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
      <div className="divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

      {/* Faint grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="section-container" style={{ position: 'relative' }}>
        <div className="about-grid">

          {/* ── Left 70%: text + pillars ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Eyebrow + heading */}
            <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0} variants={fadeUp}>
              <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>About</div>
              <h2 className="section-title" style={{ marginBottom: '1.75rem' }}>
                Who I Am
              </h2>

              {/* Body text — exact copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {[
                  `I'm a Data Scientist and AI Engineer based in Saudi Arabia, building toward a career at a global tech company — and running a consultancy in parallel.`,
                  `At Data with Usman, I work with businesses of all sizes to replace slow manual processes with intelligent, automated systems. My clients come from tech, healthcare, construction, and beyond — the problem is always the same: data exists, but nobody can use it.`,
                  `On the engineering side, I build ML pipelines, AI agents, and data infrastructure designed for production — not just notebooks.`,
                  `Long-term, I'm building toward a role at a top-tier global tech company and beyond that, something much bigger.`,
                ].map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: '#8B97B0',
                      margin: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Value pillars — icon chips */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.25}
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
            >
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.55rem 1rem',
                      background: p.accentBg,
                      border: `1px solid ${p.accentBorder}`,
                      borderRadius: 99,
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 500,
                      fontSize: '0.82rem',
                      color: p.accent,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon size={14} strokeWidth={2} />
                    {p.label}
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* ── Right 30%: photo ── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            variants={fadeUp}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProfilePhoto />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
