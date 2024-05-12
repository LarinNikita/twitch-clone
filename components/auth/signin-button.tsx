import React from 'react';
// import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';

export const SignInButton = ({ children }: { children: React.ReactNode }) => {
    // return <ClerkSignInButton>{children}</ClerkSignInButton>;
    return <div>{children}</div>;
};
