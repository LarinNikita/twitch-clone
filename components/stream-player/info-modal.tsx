'use client';

import React, { ElementRef, useRef, useState, useTransition } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { updateStream } from '@/actions/stream.action';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Hint } from '@/components/Hint';

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
}: InfoModalProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<'button'>>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState<string>(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
        initialThumbnailUrl,
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success('Stream updated');
                    closeRef?.current?.click();
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success('Thumbnail removed');
                    setThumbnailUrl('');
                    closeRef?.current?.click();
                })
                .catch(() => toast.error('Something went wrong'));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className=" ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                                <div className="absolute right-2 top-2 z-[10]">
                                    <Hint
                                        label="Remove thumbnail"
                                        asChild
                                        side="left"
                                    >
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
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    className="cursor-pointer"
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: '#ffffff',
                                        },
                                        allowedContent: {
                                            color: '#ffffff',
                                        },
                                    }}
                                    onClientUploadComplete={res => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
