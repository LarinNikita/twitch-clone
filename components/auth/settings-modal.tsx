'use client';

import React, { ElementRef, useRef, useState, useTransition } from 'react';
import { Settings, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

import { updateUser } from '@/actions/user.action';
import { UploadDropzone } from '@/lib/uploadthing';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hint } from '@/components/Hint';

interface SettingsModalProps {
    initialUsername: string | null;
    initialImage: string | null;
}

export const SettingsModal = ({
    initialUsername,
    initialImage,
}: SettingsModalProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<'button'>>(null);

    const [isPending, startTransition] = useTransition();
    const [username, setUsername] = useState(initialUsername || '');
    const [image, setImage] = useState(initialImage || '');

    const onRemove = () => {
        startTransition(() => {
            updateUser({ image: null })
                .then(() => {
                    toast.success('Image removed');
                    setImage('');
                    closeRef?.current?.click();
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ username: username })
                .then(() => {
                    toast.success('Username updated');
                    closeRef?.current?.click();
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                >
                    <Settings className="mr-2 size-4" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user settings</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        placeholder="User name"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={isPending}
                    />
                    {image ? (
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                            <div className="absolute right-2 top-2 z-[10]">
                                <Hint label="Remove image" asChild side="left">
                                    <Button
                                        type="button"
                                        disabled={isPending}
                                        onClick={onRemove}
                                        className="size-auto p-1.5"
                                        variant="danger"
                                    >
                                        <Trash className="size-4" />
                                    </Button>
                                </Hint>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                src={image}
                                alt="Image"
                            />
                        </div>
                    ) : (
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone
                                className="cursor-pointer"
                                endpoint="imageUploader"
                                appearance={{
                                    label: {
                                        color: '#ffffff',
                                    },
                                    allowedContent: {
                                        color: '#ffffff',
                                    },
                                }}
                                onClientUploadComplete={res => {
                                    setImage(res?.[0]?.url);
                                    router.refresh();
                                    closeRef?.current?.click();
                                }}
                            />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
