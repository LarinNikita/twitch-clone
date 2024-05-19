'use client';

import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export const UserButton = () => {
    const onClick = () => signOut();
    return (
        <Button size="sm" onClick={onClick}>
            <LogOutIcon className="mr-2 size-4" />
            Logout
        </Button>
    );
};
