'use client';

import { useTransition } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { onFollow, onUnfollow } from '@/actions/follow.action';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionsProps {
    isFollowing: boolean;
    hostIdentity: string;
    isHost: boolean;
}

export const Actions = ({
    isFollowing,
    hostIdentity,
    isHost,
}: ActionsProps) => {
    const router = useRouter();
    const { userId } = useAuth();
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then(data =>
                    toast.success(
                        `You are now following ${data.following.username}`,
                    ),
                )
                .catch(() => toast.error('Something went wrong'));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then(data =>
                    toast.success(
                        `You are now unfollowed ${data.following.username}`,
                    ),
                )
                .catch(() => toast.error('Something went wrong'));
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push('/sign-in');
        }

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart
                className={cn(
                    'mr-2 size-4',
                    isFollowing ? 'fill-white' : 'fill-none',
                )}
            />
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
};

export const ActionsSkeleton = () => {
    return <Skeleton className="h-10 w-full lg:w-24" />;
};
