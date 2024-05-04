import React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
    return (
        <div className="z-20 -mb-8 w-full max-w-[400px] rounded-xl bg-[#1f1f23] px-6 py-4">
            <div className="flex flex-col items-center gap-y-4">
                <div className="rounded-full bg-white p-1">
                    <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                </div>
                <div
                    className={cn('flex flex-col items-center', font.className)}
                >
                    <p className="text-xl font-semibold">GameHub</p>
                    <p className="text-muted-foreground text-sm">
                        Let&apos;s play
                    </p>
                </div>
            </div>
        </div>
    );
};
