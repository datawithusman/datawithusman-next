'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { name: 'About',    href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'Blog',     href: '/blog' },
  { name: 'Contact',  href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    if (pathname !== '/') return; // let Next router handle cross-page
    e.preventDefault();
    const id = href.replace('/#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(8,12,20,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,45,69,0.6)' : '1px solid transparent',
      }}
    >
      <nav
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#E8EDF5',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#4F8EF7')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#E8EDF5')}
        >
          Muhammad Usman
        </Link>

        {/* ── Desktop links ── */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '0.25rem' }}
        >
          {navLinks.map((link) => {
            const isActive = link.href === '/blog' && pathname.startsWith('/blog');
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                style={{
                  padding: '0.45rem 0.9rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  color: isActive ? '#E8EDF5' : '#55647A',
                  textDecoration: 'none',
                  borderRadius: 7,
                  transition: 'color 0.2s, background 0.2s',
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#55647A';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Resume */}
          <a
            href="/Muhammad_Usman_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.9rem',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '0.82rem',
              color: '#55647A',
              textDecoration: 'none',
              borderRadius: 7,
              transition: 'color 0.2s, background 0.2s',
              marginLeft: '0.25rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#55647A';
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            <FileText size={14} /> Resume
          </a>

          {/* CTA */}
          <Link
            href="/#contact"
            onClick={(e) => handleAnchor(e, '/#contact')}
            className="btn-primary"
            style={{ marginLeft: '0.75rem' }}
          >
            Let's Work Together <ArrowRight size={13} />
          </Link>
        </div>

        {/* ── Mobile toggle — flex class here so md:hidden can override it ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center md:hidden"
          aria-label="Toggle navigation"
          style={{
            background: 'none',
            border: 'none',
            color: '#8B97B0',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: 6,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#E8EDF5')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#8B97B0')}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(8,12,20,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(30,45,69,0.5)',
            padding: '1.25rem 1.5rem 1.75rem',
          }}
          className="md:hidden"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                style={{
                  padding: '0.75rem 0.75rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: '#8B97B0',
                  textDecoration: 'none',
                  borderRadius: 8,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#E8EDF5';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Resume - Mobile */}
            <a
              href="/Muhammad_Usman_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.75rem 0.75rem',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '0.88rem',
                color: '#8B97B0',
                textDecoration: 'none',
                borderRadius: 8,
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#E8EDF5';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#8B97B0';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              <FileText size={16} /> Resume
            </a>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(30,45,69,0.6)', marginTop: '0.5rem' }}>
              <Link
                href="/#contact"
                onClick={(e) => handleAnchor(e, '/#contact')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Let's Work Together <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
