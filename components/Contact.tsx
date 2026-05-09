'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, ArrowRight, CheckCircle2, Send } from 'lucide-react';

function GithubIcon({ size = 17, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'datawithusman@gmail.com',
    href: 'mailto:datawithusman@gmail.com',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/datawithusman',
    href: 'https://linkedin.com/in/datawithusman',
    external: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/datawithusman',
    href: 'https://github.com/datawithusman',
    external: true,
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [focused, setFocused]   = useState<string | null>(null);
  const [submitting, setSubmit] = useState(false);
  const [sent, setSent]         = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    // Replace action with your Formspree endpoint: https://formspree.io/f/YOUR_ID
    console.log('Form submission:', form);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setSubmit(false);
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: '#080C14',
    border: '1px solid #1E2D45',
    borderRadius: 9,
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '0.9rem',
    color: '#E8EDF5',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
    boxSizing: 'border-box',
  };

  const inputFocused: React.CSSProperties = {
    borderColor: 'rgba(79,142,247,0.55)',
    boxShadow: '0 0 0 3px rgba(79,142,247,0.08)',
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--bg)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        overflow: 'hidden',
      }}
    >
      <div className="divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

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

      {/* Accent glow */}
      <div aria-hidden style={{
        position: 'absolute', pointerEvents: 'none',
        bottom: '0%', left: '50%',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.06) 0%, transparent 65%)',
        transform: 'translateX(-50%)',
      }} />

      <div className="section-container" style={{ position: 'relative' }}>

        {/* ── Header ── */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0} variants={fadeUp}
          style={{ marginBottom: '3.5rem', maxWidth: 580 }}>
          <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>Contact</div>
          <h2 className="section-title" style={{ marginBottom: '1.1rem' }}>Let's Work Together</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.75, color: '#8B97B0', margin: 0 }}>
            Whether you need a data system built, want to discuss a project, or are reaching out
            about an engineering opportunity — I'm open to it.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="contact-grid">

          {/* Left: Direct links */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.1} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#55647A', marginBottom: '0.25rem' }}>
              Reach out directly
            </p>

            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.1rem 1.25rem',
                    background: '#0E1520',
                    border: '1px solid #1E2D45',
                    borderRadius: 12,
                    textDecoration: 'none',
                    transition: 'border-color 0.22s, box-shadow 0.22s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(79,142,247,0.4)';
                    el.style.boxShadow = '0 0 24px rgba(79,142,247,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = '#1E2D45';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 9, flexShrink: 0,
                    background: 'rgba(79,142,247,0.08)',
                    border: '1px solid rgba(79,142,247,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={17} color="#4F8EF7" strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55647A', marginBottom: '0.2rem' }}>
                      {link.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.88rem', color: '#8B97B0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {link.value}
                    </div>
                  </div>
                  <ArrowRight size={14} color="#2A3A52" />
                </a>
              );
            })}

            {/* Availability note */}
            <div style={{
              marginTop: '0.5rem', padding: '1rem 1.25rem',
              background: 'rgba(100,255,218,0.04)',
              border: '1px solid rgba(100,255,218,0.12)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#64FFDA', boxShadow: '0 0 6px rgba(100,255,218,0.8)', flexShrink: 0, animation: 'glow-pulse 2s ease-in-out infinite' }} />
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', color: '#8B97B0', lineHeight: 1.5, margin: 0 }}>
                Currently open to new projects and engineering opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.18} variants={fadeUp}>
            <div style={{
              background: '#0E1520',
              border: '1px solid #1E2D45',
              borderRadius: 14,
              padding: '2rem',
            }}>
              {sent ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center', gap: '1rem' }}>
                  <CheckCircle2 size={40} color="#64FFDA" strokeWidth={1.5} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.1rem', color: '#E8EDF5', marginBottom: '0.4rem' }}>Message sent!</p>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: '#55647A', margin: 0 }}>I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55647A', marginBottom: '0.5rem' }}>
                      Name
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={{ ...inputBase, ...(focused === 'name' ? inputFocused : {}) }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55647A', marginBottom: '0.5rem' }}>
                      Email
                    </label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="you@company.com"
                      style={{ ...inputBase, ...(focused === 'email' ? inputFocused : {}) }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55647A', marginBottom: '0.5rem' }}>
                      Message
                    </label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project or opportunity..."
                      style={{ ...inputBase, resize: 'vertical', minHeight: 120, ...(focused === 'message' ? inputFocused : {}) }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ justifyContent: 'center', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Sending...' : (<>Send Message <Send size={13} /></>)}
                  </button>

                  <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.6rem', color: '#55647A', textAlign: 'center', letterSpacing: '0.05em', margin: 0 }}>
                    Typical response time: within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
