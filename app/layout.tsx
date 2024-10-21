import DefaultLayout from '@/layouts';
import Providers from '@/providers';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Favicon from '@/app/favicon.ico';
const nutino = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StarkPot | StarkArcade Hub',
  metadataBase: new URL('https://starkpot.starkarcade.com'),
  description:
    'Pioneer on-chain prediction game on Starknet. Powered by STARK Arcade.',
  icons: {
    icon: Favicon.src,
    shortcut: Favicon.src,
    apple: Favicon.src,
    other: { rel: 'apple-touch-icon-precomposed', url: Favicon.src },
  },

  keywords: ['StarkPot', 'What is StarkPot', 'StarkArcade Hub'],
  openGraph: {
    title: 'StarkPot | StarkArcade Hub',
    description:
      'Pioneer on-chain prediction game on Starknet. Powered by STARK Arcade.',
    images: [
      {
        url: './public/assets/banner/banner.png',
        width: 1200,
        height: 600,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    url: 'https://starkpot.starkarcade.com',
    type: 'website',
    emails: 'karasbuilder@gmail.com',
    siteName: 'StarkPot',
  },
  twitter: {
    title: 'StarkPot | StarkArcade Hub',
    description:
      'Pioneer on-chain prediction game on Starknet. Powered by STARK Arcade.',
    images: {
      url: 'https://starkpot.starkarcade.com/assets/banner/banner.png',
      alt: 'Starkpot Banner',
    },

    card: 'player',
    creator: '@starkarcade',
    site: '@starkarcade',
    players: {
      playerUrl: 'https://starkpot.starkarcade.com',
      streamUrl: 'https://starkpot.starkarcade.com',
      width: 600,
      height: 600,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nutino.className}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
