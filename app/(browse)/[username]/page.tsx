import { notFound } from 'next/navigation';

import { getUserByUsername } from '@/lib/user-service';
import { isFollowingUser } from '@/lib/follow-service';

import { Actions } from './_components/actions';

interface UserPageProps {
    params: {
        username: string;
    };
}

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username);

    if (!user) notFound();

    const isFollowing = await isFollowingUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <h1>name {user.username}</h1>
            <h1>id {user.id}</h1>
            <h1>if following {JSON.stringify(isFollowing)}</h1>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
};

export default UserPage;
