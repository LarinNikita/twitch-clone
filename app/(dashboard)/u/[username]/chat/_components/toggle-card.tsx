'use client';

import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream.action';

import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
    field: FieldTypes;
    label: string;
    value: boolean;
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
    const [pending, startTransition] = useTransition();

    const onChange = async () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success('Chat settings updated!'))
                .catch(() => toast.error('Something went wrong'));
        });
    };

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="shrink-0 font-semibold">{label}</p>
                <div className="space-y-2">
                    <Switch
                        disabled={pending}
                        onCheckedChange={onChange}
                        checked={value}
                    >
                        {value ? 'On' : 'Off'}
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export const ToggleCardSkeleton = () => {
    return <Skeleton className="w-full rounded-xl p-10" />;
};
