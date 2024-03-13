import DefaultLayout from '@/layouts';
import Providers from '@/providers';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';

const nutino = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Starknet Lottery | Decolgen Labs',
  description: 'Build From Decolgen Labs',
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
