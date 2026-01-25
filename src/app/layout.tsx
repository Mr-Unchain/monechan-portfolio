import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monechan Portfolio',
  description: "Monechan's Portfolio - UI/UX, Web & Graphic Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
