import type { Metadata } from 'next';
import { Rethink_Sans, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import {
  Header,
  Footer,
} from '@/components';
import { AppProviders } from '@/components/shared/AppProviders';
import { ToastContainer } from '@/components/shared/ToastContainer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://careerforge.com'),
  title: 'CareerForge - The Future of Hiring',
  description:
    'The all-in-one AI platform connecting top talent with innovative companies. Optimize resumes, find perfect matches, and accelerate your career growth.',
  keywords: [
    'AI hiring platform',
    'resume optimization',
    'job matching',
    'career development',
    'talent acquisition',
    'ATS optimization',
    'recruitment software',
  ],
  authors: [{ name: 'CareerForge Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://careerforge.com',
    title: 'CareerForge - The Future of Hiring',
    description:
      'The all-in-one AI platform connecting top talent with innovative companies. Optimize resumes, find perfect matches, and accelerate your career growth.',
    siteName: 'CareerForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerForge - The Future of Hiring',
    description:
      'The all-in-one AI platform connecting top talent with innovative companies. Optimize resumes, find perfect matches, and accelerate your career growth.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${rethinkSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <Script
          src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <AppProviders>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToastContainer />
        </AppProviders>
      </body>
    </html>
  );
}
