'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import posts, { postCategories } from '@/data/posts';

const CAT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Automation':     { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.22)'  },
  'AI Engineering': { color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',  border: 'rgba(79,142,247,0.22)'  },
  'Career':         { color: '#FFB86C', bg: 'rgba(255,184,108,0.08)', border: 'rgba(255,184,108,0.22)' },
  'Data':           { color: '#64FFDA', bg: 'rgba(100,255,218,0.06)', border: 'rgba(100,255,218,0.2)'  },
};
const DEFAULT_CAT = { color: '#8B97B0', bg: 'rgba(139,151,176,0.08)', border: 'rgba(139,151,176,0.2)' };

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function BlogPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? posts
    : posts.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>

        {/* ── Hero band ── */}
        <div style={{ position: 'relative', background: 'var(--surface)', paddingTop: '5rem', paddingBottom: '4rem', overflow: 'hidden' }}>
          <div className="divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }} />
          <div className="section-container" style={{ position: 'relative' }}>
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
              <Link href="/"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', color: '#55647A', textDecoration: 'none', marginBottom: '1.75rem', transition: 'color 0.18s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#55647A'; }}
              >
                <ArrowLeft size={13} /> Back to Home
              </Link>
              <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Blog</div>
              <h1 className="section-title" style={{ marginBottom: '1rem' }}>Writing</h1>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.7, color: '#8B97B0', maxWidth: 500, margin: 0 }}>
                Breakdowns, lessons, and real talk about data, AI, and building systems that work.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Posts ── */}
        <div className="section-container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>

          {/* Filter tabs */}
          <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {postCategories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '0.82rem',
                    padding: '0.45rem 1.1rem', borderRadius: 99, cursor: 'pointer',
                    border: isActive ? '1px solid rgba(79,142,247,0.5)' : '1px solid #1E2D45',
                    background: isActive ? 'rgba(79,142,247,0.12)' : 'transparent',
                    color: isActive ? '#4F8EF7' : '#55647A',
                    transition: 'all 0.18s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Cards or empty state */}
          {filtered.length === 0 ? (
            <motion.div initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
              style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.82rem', color: '#55647A', letterSpacing: '0.06em' }}>
                First post coming soon.
              </p>
            </motion.div>
          ) : (
            <div className="blog-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => {
                  const cat = CAT_STYLE[post.category] ?? DEFAULT_CAT;
                  return (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      style={{
                        background: '#0E1520', border: '1px solid #1E2D45', borderRadius: 14,
                        padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem',
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
                      {/* Category + read time */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.07em', padding: '0.2rem 0.65rem', borderRadius: 4, background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                          {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
                          <Clock size={10} /> {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1rem', color: '#E8EDF5', lineHeight: 1.4, margin: 0 }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.84rem', lineHeight: 1.7, color: '#55647A', margin: 0,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>

                      {/* Read More — published only */}
                      {post.published && (
                        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #1E2D45' }}>
                          <Link href={`/blog/${post.slug}`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '0.8rem', color: '#4F8EF7', textDecoration: 'none' }}>
                            Read More <ArrowRight size={12} />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
