import type { Metadata } from 'next';
import { Kalam, Comic_Neue } from 'next/font/google';
import './globals.css';

// import $ from 'jquery';

const kalam = Kalam({
  variable: '--font-user',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const comicNeue = Comic_Neue({
  variable: '--font-system',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Pull My Thread',
  description: 'Addressing the loneliness epidemic..',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/arms-400.png" />
        {/* <script src="/telescopic.js" async></script> */}
      </head>
      <body
        className={`
          ${kalam.variable} 
          ${comicNeue.variable} 
          antialiased
          font-system
        `}
      >
        {children}
      </body>
    </html>
  );
}
