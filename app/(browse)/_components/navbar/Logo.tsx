import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 transition hover:opacity-75">
                <div className="mr-10 shrink-0 rounded-full bg-white p-1 lg:mr-0 lg:shrink">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                </div>
                <div className={cn('hidden lg:block', font.className)}>
                    <p className="text-lg font-semibold">GameHub</p>
                    <p className="text-xs text-muted-foreground">
                        Let&apos;s play
                    </p>
                </div>
            </div>
        </Link>
    );
};
