import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { generateFromEmail } from 'unique-username-generator';

import { db } from './lib/db';
import authConfig from './next-auth.config';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    events: {
        createUser: async ({ user }) => {
            const email = user.email || '';
            const username = generateFromEmail(email, 3);

            await db.user.update({
                where: { email },
                data: {
                    username: username,
                    stream: {
                        create: {
                            name: `${username}'s stream`,
                        },
                    },
                },
            });
        },
    },
    ...authConfig,
});
