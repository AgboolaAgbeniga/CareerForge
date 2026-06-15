import type { Metadata } from 'next';
import { Rethink_Sans, Inter } from 'next/font/google';
import './globals.css';
import {
  Header,
  Footer,
  ToastProvider,
  ThemeProvider,
} from '@/components';
import { AuthProvider } from '@/lib/authContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const rethinkSans = Inter({
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
  creator: 'CareerForge',
  publisher: 'CareerForge',
  openGraph: {
    title: 'CareerForge - The Future of Hiring',
    description:
      'The all-in-one AI platform connecting top talent with innovative companies. Optimize resumes, find perfect matches, and accelerate your career growth.',
    url: 'https://careerforge.com',
    siteName: 'CareerForge',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CareerForge - AI-Powered Hiring Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerForge - The Future of Hiring',
    description:
      'The all-in-one AI platform connecting top talent with innovative companies.',
    images: ['/og-image.jpg'],
    creator: '@careerforge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
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
      </head>
      <body className="font-sans text-slate-600 antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-slate-900 dark:text-slate-400 dark:selection:bg-indigo-900 dark:selection:text-indigo-100">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
