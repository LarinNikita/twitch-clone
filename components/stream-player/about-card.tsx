'use client';

import { VerifiedMark } from '@/components/verified-mark';
import { BioModal } from './bio-modal';

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followingByCount: number;
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followingByCount,
}: AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followingByCount === 1 ? 'follower' : 'followers';

    return (
        <div className="px-4">
            <div className="group flex flex-col gap-y-3 rounded-xl bg-background p-6 lg:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && <BioModal initialValue={bio} />}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">
                        {followingByCount}
                    </span>{' '}
                    {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio ||
                        'This user prefers to keep an air of mystery about them.'}
                </p>
            </div>
        </div>
    );
};
