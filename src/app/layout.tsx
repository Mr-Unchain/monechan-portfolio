import type { Metadata } from 'next';
import { Space_Grotesk, Noto_Sans_JP, Bebas_Neue } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Monechan Portfolio',
  description: "Monechan's Portfolio - UI/UX, Web & Graphic Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${notoSansJP.variable} ${bebasNeue.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
