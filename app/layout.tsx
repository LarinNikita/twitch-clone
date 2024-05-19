import React from 'react';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/next-auth';

import type { Metadata } from 'next';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GameHub',
    description: 'Video streaming service',
    icons: '/logo.svg',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        forcedTheme="dark"
                        storageKey="GameHub-theme"
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
