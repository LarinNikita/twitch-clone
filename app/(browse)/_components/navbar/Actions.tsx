import React from 'react';
import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { currentUser } from '@/lib/auth';
import { UserButton } from '@/components/auth/user-button';
import { SignInButton } from '@/components/auth/signin-button';

import { Button } from '@/components/ui/button';

export const Actions = async () => {
    const user = await currentUser();

    return (
        <div className="ml-4 flex items-center justify-end gap-x-2 lg:ml-0">
            {!user && <SignInButton />}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        asChild
                    >
                        <Link href={`/u/${user.username}`}>
                            <Clapperboard className="size-5 lg:mr-2" />
                            <span className="hidden lg:block">Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton />
                </div>
            )}
        </div>
    );
};
