'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart2, Brain, Database } from 'lucide-react';

const SERVICES = [
  {
    icon: BarChart2,
    title: 'Business Automation\n& Dashboards',
    intro: 'For non-tech businesses that are drowning in spreadsheets and manual reporting.',
    bullets: [
      'Automated reporting systems',
      'Custom KPI dashboards',
      'Invoice & payment tracking',
      'Operational workflow automation',
    ],
    cta: 'You describe the pain. I build the fix.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning\nEngineering',
    intro: 'For tech teams that need intelligent systems built right.',
    bullets: [
      'ML model development & deployment',
      'AI agent & LLM integration',
      'Predictive analytics pipelines',
      'Python-based AI workflow automation',
    ],
    cta: 'From notebook to production.',
  },
  {
    icon: Database,
    title: 'Data Infrastructure\n& Pipelines',
    intro: 'For companies where data exists but nobody can use it.',
    bullets: [
      'ETL pipeline design',
      'Data cleaning & structuring',
      'Database architecture',
      'API integrations & data connections',
    ],
    cta: 'Your data, finally under control.',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--bg)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        overflow: 'hidden',
      }}
    >
      <div className="divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

      {/* Faint grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute', pointerEvents: 'none',
          top: '40%', left: '50%',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.05) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="section-container" style={{ position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Services</div>
          <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
            What I Build
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: '#8B97B0',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            Solutions that work for businesses today — and systems engineered for scale tomorrow.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={0.15 + i * 0.12}
                variants={fadeUp}
                style={{
                  background: '#0E1520',
                  border: '1px solid #1E2D45',
                  borderRadius: 14,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  cursor: 'default',
                  transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                }}
                whileHover={{
                  scale: 1.025,
                  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(79,142,247,0.4)';
                  el.style.boxShadow = '0 0 40px rgba(79,142,247,0.07), 0 8px 32px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#1E2D45';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48, height: 48,
                    borderRadius: 11,
                    background: 'rgba(79,142,247,0.1)',
                    border: '1px solid rgba(79,142,247,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color="#4F8EF7" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: '#E8EDF5',
                      lineHeight: 1.35,
                      whiteSpace: 'pre-line',
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                </div>

                {/* Intro */}
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: '#8B97B0',
                    margin: 0,
                  }}
                >
                  {s.intro}
                </p>

                {/* Bullet list */}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '0.84rem',
                        color: '#8B97B0',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          marginTop: '0.45em',
                          width: 5, height: 5,
                          borderRadius: '50%',
                          background: '#4F8EF7',
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA line */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #1E2D45',
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.72rem',
                    color: '#4F8EF7',
                    letterSpacing: '0.04em',
                  }}
                >
                  → {s.cta}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
