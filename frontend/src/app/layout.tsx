import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';

import '@/app/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import AuthServer from '@/components/auth/AuthServer';
import { Providers } from '@/components/Providers';
import { ToastProvider } from '@/components/toast/ToastProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Seenit',
  description: 'A video sharing platform clone built with Next.js and Tailwind CSS.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <NextIntlClientProvider>
          <ToastProvider>
            <Providers>
              <AuthServer>{children}</AuthServer>
            </Providers>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
