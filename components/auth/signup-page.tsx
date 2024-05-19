'use client';

import { FcGoogle } from 'react-icons/fc';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export const SignUp = () => {
    const onClick = () => {
        signIn('google');
    };
    return (
        <div className="flex w-full max-w-[400px] items-center justify-center rounded-b-xl bg-[#1f1f23] px-4 pb-6">
            <Button onClick={onClick}>
                <FcGoogle className="mr-4 size-4" />
                Sign up with Google
            </Button>
        </div>
    );
};
