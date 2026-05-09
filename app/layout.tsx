import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Usman — Data Scientist & AI Engineer',
  description:
    'Data Scientist and AI Engineer building automation systems, ML pipelines, and intelligent dashboards. Founder of Data with Usman. Open to projects and opportunities.',
  keywords: [
    'data scientist', 'AI engineer', 'machine learning', 'Python',
    'automation', 'Muhammad Usman', 'datawithusman', 'Saudi Arabia',
  ],
  authors: [{ name: 'Muhammad Usman', url: 'https://datawithusman.com' }],
  openGraph: {
    title: 'Muhammad Usman — Data Scientist & AI Engineer',
    description: 'Building automation systems, ML pipelines, and intelligent dashboards.',
    url: 'https://datawithusman.com',
    siteName: 'Data with Usman',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Usman — Data Scientist & AI Engineer',
    description: 'Data Scientist, AI Engineer & Founder of Data with Usman.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="font-body antialiased bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
