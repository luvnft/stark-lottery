import DefaultLayout from '@/layouts';
import Providers from '@/providers';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Favicon from '@/app/favicon.ico';
const nutino = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StarkPot | StarkArcade Hub',
  metadataBase: new URL('https://beta.metalslug.fun'),
  description:
    'Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet',
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
      'Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet',
    images: [
      {
        url: './public/assets/banner/banner.png',
        width: 1200,
        height: 600,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    url: 'https://beta.metalslug.fun',
    type: 'website',
    emails: 'karasbuilder@gmail.com',
    siteName: 'StarkPot',
  },
  twitter: {
    title: 'StarkPot | StarkArcade Hub',
    description:
      'Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet',
    images: {
      url: './public/assets/banner/banner.png',
      alt: 'Starkpot Banner',
    },

    card: 'player',
    creator: '@starkarcade',
    site: '@starkarcade',
    players: {
      playerUrl: 'https://beta.metalslug.fun',
      streamUrl: 'https://beta.metalslug.fun',
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
