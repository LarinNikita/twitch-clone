'use client';

import { useTransition } from 'react';
import { MinusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { cn, stringToColor } from '@/lib/utils';
import { onBlock } from '@/actions/block.action';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: CommunityItemProps) => {
    const [isPending, startTransition] = useTransition();

    const color = stringToColor(participantName || '');
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error('Something went wrong'));
        });
    };

    return (
        <div
            className={cn(
                'group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5',
                isPending && 'pointer-events-none opacity-50',
            )}
        >
            <p className="font-medium capitalize" style={{ color: color }}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button
                        variant="ghost"
                        disabled={isPending}
                        onClick={handleBlock}
                        className="size-auto p-1 opacity-0 transition group-hover:opacity-100"
                    >
                        <MinusCircle className="size-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    );
};
