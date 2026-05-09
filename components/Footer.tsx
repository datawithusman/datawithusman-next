'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'About',    href: '/#about'    },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog',     href: '/blog'      },
  { name: 'Contact',  href: '/#contact'  },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    if (pathname !== '/') return;
    e.preventDefault();
    const id = href.replace('/#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid #1E2D45',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="section-container">

        {/* Top row: copyright + nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          {/* Left: copyright */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.82rem',
            color: '#55647A',
            margin: 0,
          }}>
            © 2025{' '}
            <span style={{ color: '#8B97B0' }}>Muhammad Usman</span>
            {' · '}
            <span style={{ color: '#8B97B0' }}>Data with Usman</span>
          </p>

          {/* Right: nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
            {LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  color: '#55647A',
                  textDecoration: 'none',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 6,
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#55647A'; }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom: tagline */}
        <p style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: '#2A3A52',
          textAlign: 'center',
          margin: '1.25rem 0 0',
        }}>
          Built with Next.js · Designed for scale
        </p>
      </div>
    </footer>
  );
}
