'use client';

import React from 'react';
import { useIsClient } from 'usehooks-ts';

import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';

import { ToggleSkeleton } from './Toggle';
import { RecommendedSkeleton } from './Recommended';
import { FollowingSkeleton } from './Following';

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient();
    const { collapsed } = useSidebar(state => state);

    if (!isClient) {
        return (
            <aside className="fixed left-0 z-50 flex h-screen w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                'fixed left-0 z-50 flex h-screen w-60 flex-col border-r border-[#2d2e35] bg-background',
                collapsed && 'w-[70px]',
            )}
        >
            {children}
        </aside>
    );
};
