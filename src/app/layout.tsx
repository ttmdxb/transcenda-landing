import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transcenda - AI-Powered Business Automation | 47% Revenue Growth in 90 Days',
  description: 'Dubai\'s elite businesses trust Transcenda to deploy military-grade CRM systems, Voice AI agents & conversion machines. Watch your revenue jump 47% in 90 days.',
  keywords: 'AI automation, CRM systems, voice AI, business growth, Dubai, lead generation, sales automation',
  openGraph: {
    title: 'Transcenda - AI-Powered Business Automation',
    description: 'Watch your business revenue jump 47% in 90 days through AI-powered automation',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Transcenda',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Transcenda AI Business Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transcenda - AI-Powered Business Automation',
    description: 'Watch your business revenue jump 47% in 90 days through AI-powered automation',
    images: ['/images/twitter-card.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00D4FF" />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
