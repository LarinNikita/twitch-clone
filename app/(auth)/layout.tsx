import React from 'react';

import { Logo } from './_components/Logo';

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Logo />
            {children}
        </div>
    );
}

export default AuthLayout;
