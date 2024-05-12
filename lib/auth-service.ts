import { currentUser } from '@/lib/auth';

import { db } from '@/lib/db';

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error('Unauthorized');
    }

    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if (!user) {
        throw new Error('Not found user');
    }

    return user;
};

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error('Unauthorized');
    }

    const user = await db.user.findUnique({
        where: { username },
    });

    if (!user) {
        throw new Error('Not found user');
    }

    if (self.username !== user.username) {
        throw new Error('Unauthorized');
    }

    return user;
};
