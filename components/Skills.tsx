'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GROUPS = [
  {
    label: 'Languages & Core',
    skills: ['Python', 'SQL', 'JavaScript', 'Bash'],
    accent: '#4F8EF7',
  },
  {
    label: 'Data & ML',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost'],
    accent: '#64FFDA',
  },
  {
    label: 'AI & LLMs',
    skills: ['LangChain', 'OpenAI API', 'Hugging Face', 'RAG', 'AI Agents', 'Prompt Engineering'],
    accent: '#FFB86C',
  },
  {
    label: 'Engineering & Infra',
    skills: ['FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'REST APIs', 'Streamlit', 'Plotly'],
    accent: '#C084FC',
  },
  {
    label: 'Cloud & Deployment',
    skills: ['AWS', 'GCP', 'Vercel', 'Linux', 'Jupyter'],
    accent: '#F472B6',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
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
            linear-gradient(rgba(79,142,247,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="section-container" style={{ position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={0} variants={fadeUp}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Toolkit</div>
          <h2 className="section-title">Skills &amp; Stack</h2>
        </motion.div>

        {/* ── Groups grid ── */}
        <div className="skills-grid">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1 + gi * 0.08}
              variants={fadeUp}
              style={{
                background: '#0E1520',
                border: '1px solid #1E2D45',
                borderRadius: 14,
                padding: '1.5rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem',
              }}
            >
              {/* Group label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: group.accent,
                    boxShadow: `0 0 6px ${group.accent}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: group.accent,
                  }}
                >
                  {group.label}
                </span>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.03em',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid #1E2D45',
                      color: '#8B97B0',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.18s, border-color 0.18s, background 0.18s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.color = group.accent;
                      el.style.borderColor = `${group.accent}44`;
                      el.style.background = `${group.accent}0D`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.color = '#8B97B0';
                      el.style.borderColor = '#1E2D45';
                      el.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
