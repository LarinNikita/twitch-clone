import React from 'react';

import { Logo } from './Logo';
import { Actions } from './Actions';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 z-[49] flex h-20 w-full items-center justify-between bg-[#252731] px-3.5 shadow-sm lg:px-4">
            <Logo />
            <Actions />
        </nav>
    );
};