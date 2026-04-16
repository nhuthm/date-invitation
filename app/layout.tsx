import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'An invitation',
  description: 'A little something for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
