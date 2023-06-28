import '@/styles/globals.css';
import { Metadata } from 'next';
import React from 'react';
import { Roboto_Flex } from 'next/font/google';

/** components */
import Providers from './providers';

const roboto = Roboto_Flex({
  subsets: ['latin'],
});

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: 'Photos',
  description: 'A place for my photos.',
  viewport: { width: 'device-width', initialScale: 1 },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default RootLayout;
