'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { onFollow } from '@/actions/follow.action';

import { Button } from '@/components/ui/button';

interface ActionsProps {
    userId: string;
    isFollowing: boolean;
}

export const Actions = ({ userId, isFollowing }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onFollow(userId)
                .then(data =>
                    toast.success(
                        `You are now following ${data.following.username}`,
                    ),
                )
                .catch(() => toast.error('Something went wrong'));
        });
    };
    return (
        <Button
            disabled={isFollowing || isPending}
            onClick={onClick}
            variant="primary"
        >
            Follow
        </Button>
    );
};
