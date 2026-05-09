'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import projects, { categories } from '@/data/projects';

/* ── Category colours ── */
const CAT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Business Solutions': {
    color: '#4ADE80',
    bg:    'rgba(74,222,128,0.08)',
    border:'rgba(74,222,128,0.22)',
  },
  'AI & Engineering': {
    color: '#4F8EF7',
    bg:    'rgba(79,142,247,0.08)',
    border:'rgba(79,142,247,0.22)',
  },
  'Research & Scale': {
    color: '#FFB86C',
    bg:    'rgba(255,184,108,0.08)',
    border:'rgba(255,184,108,0.22)',
  },
};

const DEFAULT_CAT = { color: '#8B97B0', bg: 'rgba(139,151,176,0.08)', border: 'rgba(139,151,176,0.2)' };

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
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

        {/* ── Header ── */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={0} variants={fadeUp}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Work</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Projects</h2>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: '1rem',
            lineHeight: 1.7, color: '#8B97B0', maxWidth: 500, margin: 0,
          }}>
            A mix of business solutions, engineering work, and AI research.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={0.1} variants={fadeUp}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 99,
                  border: isActive
                    ? '1px solid rgba(79,142,247,0.5)'
                    : '1px solid #1E2D45',
                  background: isActive
                    ? 'rgba(79,142,247,0.12)'
                    : 'transparent',
                  color: isActive ? '#4F8EF7' : '#55647A',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#8B97B0';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,151,176,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#55647A';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#1E2D45';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const cat = CAT_STYLE[project.category] ?? DEFAULT_CAT;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 } }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  style={{
                    background: '#0E1520',
                    border: '1px solid #1E2D45',
                    borderRadius: 14,
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.1rem',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(79,142,247,0.35)';
                    el.style.boxShadow = '0 0 40px rgba(79,142,247,0.07), 0 8px 32px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = '#1E2D45';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {/* Top row: category tag + tool badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                    {/* Category tag */}
                    <span style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.07em',
                      padding: '0.2rem 0.65rem',
                      borderRadius: 4,
                      background: cat.bg,
                      color: cat.color,
                      border: `1px solid ${cat.border}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {project.category}
                    </span>

                    {/* Tool badges */}
                    {project.tools.map((tool: string) => (
                      <span key={tool} style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.05em',
                        padding: '0.18rem 0.55rem',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.04)',
                        color: '#55647A',
                        border: '1px solid rgba(255,255,255,0.07)',
                        whiteSpace: 'nowrap',
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#E8EDF5',
                    lineHeight: 1.35,
                    margin: 0,
                  }}>
                    {project.title}
                  </h3>

                  {/* Problem */}
                  <p style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.84rem',
                    lineHeight: 1.65,
                    color: '#55647A',
                    margin: 0,
                  }}>
                    {project.problem}
                  </p>

                  {/* Result */}
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(79,142,247,0.05)',
                    border: '1px solid rgba(79,142,247,0.12)',
                    borderRadius: 8,
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.84rem',
                      lineHeight: 1.6,
                      color: '#C8D0E0',
                      margin: 0,
                      fontWeight: 500,
                    }}>
                      {project.result}
                    </p>
                  </div>

                  {/* View Details link */}
                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <a
                      href={`/projects/${project.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontFamily: 'var(--font-dm-sans)',
                        fontWeight: 500,
                        fontSize: '0.82rem',
                        color: '#4F8EF7',
                        textDecoration: 'none',
                        transition: 'gap 0.18s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.65rem'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.4rem'; }}
                    >
                      View Details <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          custom={0.5} variants={fadeUp}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.72rem',
            color: '#55647A',
            letterSpacing: '0.05em',
          }}
        >
          → More projects coming as I build them.
        </motion.p>

      </div>
    </section>
  );
}
