import React from 'react';

import { getRecommended } from '@/lib/recommended-service';

import { Wrapper } from './Wrapper';
import { Toggle, ToggleSkeleton } from './Toggle';
import { Recommended, RecommendedSkeleton } from './Recommended';

export const Sidebar = async () => {
    const recommended = await getRecommended();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    );
};

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};
