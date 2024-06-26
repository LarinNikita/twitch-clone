import React from 'react';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export const Actions = async () => {
    return (
        <div className="flex items-center justify-end gap-x-2">
            <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href="/">
                    <LogOut className="mr-2 size-5" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};
