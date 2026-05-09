'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

/* ── Category colours ── */
const CAT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Automation':    { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.22)'  },
  'AI Engineering':{ color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',  border: 'rgba(79,142,247,0.22)'  },
  'Career':        { color: '#FFB86C', bg: 'rgba(255,184,108,0.08)', border: 'rgba(255,184,108,0.22)' },
  'Data':          { color: '#64FFDA', bg: 'rgba(100,255,218,0.06)', border: 'rgba(100,255,218,0.2)'  },
};
const DEFAULT_CAT = { color: '#8B97B0', bg: 'rgba(139,151,176,0.08)', border: 'rgba(139,151,176,0.2)' };

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function BlogPreview({ posts }: { posts: any[] }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const preview = posts.slice(0, 3);

  return (
    <section
      id="blog"
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
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}
        >
          <div>
            <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Blog</div>
            <h2 className="section-title" style={{ marginBottom: '0.85rem' }}>Writing</h2>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.7, color: '#8B97B0', maxWidth: 480, margin: 0 }}>
              Breakdowns, lessons, and real talk about data, AI, and building systems that work.
            </p>
          </div>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '0.85rem',
              color: '#4F8EF7', textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'gap 0.18s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.7rem'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '0.45rem'; }}
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* ── Cards ── */}
        <div className="blog-grid">
          {preview.map((post, i) => {
            const cat = CAT_STYLE[post.category] ?? DEFAULT_CAT;
            return (
              <motion.div
                key={post.slug}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                custom={0.12 + i * 0.1} variants={fadeUp}
                style={{
                  background: '#0E1520',
                  border: '1px solid #1E2D45',
                  borderRadius: 14,
                  padding: '1.75rem',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
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
                {/* Top row: category + read time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem',
                    letterSpacing: '0.07em', padding: '0.2rem 0.65rem',
                    borderRadius: 4, background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1rem', color: '#E8EDF5', lineHeight: 1.4, margin: 0 }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.84rem', lineHeight: 1.7, color: '#55647A', margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.excerpt}
                </p>

                {/* Read More — always link to post page */}
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #1E2D45' }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '0.8rem', color: '#4F8EF7', textDecoration: 'none' }}
                  >
                    {post.published ? 'Read More' : 'Preview'} <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
