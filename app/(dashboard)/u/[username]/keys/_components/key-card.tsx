'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { CopyButton } from './copy-button';
import { Button } from '@/components/ui/button';

interface KeyCardProps {
    value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center gap-x-10">
                <p className="shrink-0 font-semibold">Stream Key</p>
                <div className="w-full space-y-2">
                    <div className="flex w-full items-center gap-x-2">
                        <Input
                            value={value || ''}
                            disabled
                            className="!cursor-default"
                            type={show ? 'text' : 'password'}
                            placeholder="Stream key"
                        />
                        <CopyButton value={value || ''} />
                        <Button
                            onClick={() => setShow(!show)}
                            size="sm"
                            variant="ghost"
                        >
                            {show ? (
                                <EyeOff className="size-5" />
                            ) : (
                                <Eye className="size-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
