'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export const updateUser = async (values: Partial<User>) => {
    try {
        const self = await getSelf();

        const validData = {
            username: values.username,
            bio: values.bio,
        };

        if (validData.username === '' || validData.username === null) {
            throw new Error('User name is required');
        }

        const user = await db.user.update({
            where: { id: self.id },
            data: { ...validData },
        });

        revalidatePath(`/${self.username}`);
        revalidatePath(`/u/${self.username}`);

        return user;
    } catch {
        throw new Error('Internal Error');
    }
};
