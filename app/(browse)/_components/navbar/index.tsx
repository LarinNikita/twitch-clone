import React from 'react';

import { Logo } from './Logo';
import { Search } from './Search';

type Props = {};

export const Navbar = (props: Props) => {
    return (
        <nav className="fixed top-0 z-[49] flex h-20 w-full items-center justify-between bg-[#252731] px-2 shadow-sm lg:px-4">
            <Logo />
            <Search />
        </nav>
    );
};
