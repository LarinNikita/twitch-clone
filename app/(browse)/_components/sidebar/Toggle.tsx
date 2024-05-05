'use client';

import React from 'react';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { useSidebar } from '@/store/use-sidebar';

import { Button } from '@/components/ui/button';
import { Hint } from '@/components/Hint';

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useSidebar(state => state);

    const label = collapsed ? 'Expand' : 'Collapse';

    return (
        <>
            {collapsed && (
                <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onExpand}
                            variant="ghost"
                            className="h-auto p-2"
                        >
                            <ArrowRightFromLine className="size-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="mb-2 flex w-full items-center p-3 pl-6">
                    <p className="font-semibold text-primary">For you</p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onCollapse}
                            variant="ghost"
                            className="ml-auto h-auto p-2"
                        >
                            <ArrowLeftFromLine className="size-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};
