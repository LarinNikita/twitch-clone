import { db } from '@/lib/db';

export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000)); //for testing sidebar skeleton

    const users = await db.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return users;
};
