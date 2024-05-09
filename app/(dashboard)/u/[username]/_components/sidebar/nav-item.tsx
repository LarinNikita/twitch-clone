'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface NavItemProps {
    label: string;
    icon: LucideIcon;
    href: string;
    isActive: boolean;
}

export const NavItem = ({
    label,
    icon: Icon,
    href,
    isActive,
}: NavItemProps) => {
    const { collapsed } = useCreatorSidebar(state => state);

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                'h-12 w-full',
                collapsed ? 'justify-center' : 'justify-start',
                isActive && 'bg-accent',
            )}
        >
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon
                        className={cn('size-4', collapsed ? 'mr-0' : 'mr-2')}
                    />
                    {!collapsed && <span>{label}</span>}
                </div>
            </Link>
        </Button>
    );
};

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-1 py-2">
            <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
            <div className="hidden flex-1 lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
