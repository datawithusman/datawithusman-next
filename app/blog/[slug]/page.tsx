import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import posts from '@/data/posts';

const CAT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  'Automation':    { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.22)'  },
  'AI Engineering':{ color: '#4F8EF7', bg: 'rgba(79,142,247,0.08)',  border: 'rgba(79,142,247,0.22)'  },
  'Career':        { color: '#FFB86C', bg: 'rgba(255,184,108,0.08)', border: 'rgba(255,184,108,0.22)' },
  'Data':          { color: '#64FFDA', bg: 'rgba(100,255,218,0.06)', border: 'rgba(100,255,218,0.2)'  },
};
const DEFAULT_CAT = { color: '#8B97B0', bg: 'rgba(139,151,176,0.08)', border: 'rgba(139,151,176,0.2)' };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  /* Unknown slug — graceful 404-like page */
  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.75rem', color: '#55647A', letterSpacing: '0.1em', marginBottom: '1rem' }}>POST NOT FOUND</p>
            <Link href="/blog" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#4F8EF7', textDecoration: 'none' }}>← Back to Blog</Link>
          </div>
        </main>
      </>
    );
  }

  const cat = CAT_STYLE[post.category] ?? DEFAULT_CAT;
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const relatedPosts = related.length ? related : fallbackRelated;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>

        {/* ── Article ── */}
        <article
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '5rem 1.5rem 6rem',
          }}
        >
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem',
              color: '#55647A', textDecoration: 'none', marginBottom: '2.5rem',
              transition: 'color 0.18s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#55647A'; }}
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.07em',
              padding: '0.2rem 0.65rem', borderRadius: 4,
              background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
            }}>
              {post.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
              <Clock size={10} /> {post.readTime}
            </span>
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A' }}>
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-syne)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#E8EDF5', lineHeight: 1.15,
              letterSpacing: '-0.025em', marginBottom: '2.5rem',
            }}
          >
            {post.title}
          </h1>

          <div className="divider" style={{ marginBottom: '2.5rem' }} />

          {/* Body — published or coming soon */}
          {post.published && post.content ? (
            <div
              style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '1.125rem',
                lineHeight: 1.8, color: '#8B97B0',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '5rem 2rem', textAlign: 'center',
                background: '#0E1520', border: '1px solid #1E2D45', borderRadius: 14,
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Lock size={20} color="#4F8EF7" strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.1rem', color: '#E8EDF5', marginBottom: '0.6rem' }}>
                Coming Soon
              </p>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: '#55647A', lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
                This post is still being written. Check back soon — or{' '}
                <Link href="/#contact" style={{ color: '#4F8EF7', textDecoration: 'none' }}>get notified</Link>{' '}
                when it drops.
              </p>
            </div>
          )}
        </article>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <div
            style={{
              borderTop: '1px solid #1E2D45',
              paddingTop: '4rem', paddingBottom: '5rem',
              background: 'var(--surface)',
            }}
          >
            <div
              style={{
                maxWidth: 720, margin: '0 auto', padding: '0 1.5rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#55647A', marginBottom: '1.5rem' }}>
                More Posts
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {relatedPosts.map((rp) => {
                  const rcat = CAT_STYLE[rp.category] ?? DEFAULT_CAT;
                  return (
                    <div
                      key={rp.slug}
                      style={{
                        background: '#0E1520', border: '1px solid #1E2D45', borderRadius: 12,
                        padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
                        transition: 'border-color 0.22s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79,142,247,0.3)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1E2D45'; }}
                    >
                      <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', letterSpacing: '0.07em', padding: '0.18rem 0.55rem', borderRadius: 4, background: rcat.bg, color: rcat.color, border: `1px solid ${rcat.border}`, width: 'fit-content' }}>
                        {rp.category}
                      </span>
                      <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '0.9rem', color: '#E8EDF5', lineHeight: 1.4, margin: 0 }}>
                        {rp.title}
                      </p>
                      {rp.published ? (
                        <Link href={`/blog/${rp.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontSize: '0.8rem', color: '#4F8EF7', textDecoration: 'none', marginTop: 'auto' }}>
                          Read <ArrowRight size={12} />
                        </Link>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A', marginTop: 'auto' }}>
                          <Lock size={10} /> Coming Soon
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
