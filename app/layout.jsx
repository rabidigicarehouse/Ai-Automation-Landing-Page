import './globals.css';

export const metadata = {
  title: 'The Ai Syndicates | DigiCareHouse AI & Automation Agency',
  description:
    'The Ai Syndicates by DigiCareHouse designs AI systems, automation workflows, copilots, integrations, and intelligent operations for modern teams.',
  keywords: [
    'The Ai Syndicates',
    'DigiCareHouse',
    'AI automation agency',
    'AI agents',
    'workflow automation',
    'system integrations',
    'copilots',
    'conversational AI',
    'business automation',
  ],
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'DigiCareHouse' }],
  openGraph: {
    type: 'website',
    siteName: 'The Ai Syndicates',
    title: 'The Ai Syndicates | DigiCareHouse AI & Automation Agency',
    description:
      'AI systems, automation architecture, copilots, and intelligent workflow design by The Ai Syndicates.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
      },
    ],
    url: 'https://ai-automation-landing-page-sigma.vercel.app/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ai Syndicates | DigiCareHouse AI & Automation Agency',
    description:
      'AI copilots, automation systems, agent orchestration, and intelligent operations by The Ai Syndicates.',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=5" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=5" />
        <link rel="apple-touch-icon" href="/favicon.png?v=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 overflow-x-hidden font-sans antialiased text-slate-900 selection:bg-accent selection:text-white dark:bg-dark-bg dark:text-white">
        {children}
      </body>
    </html>
  );
}
