import React, { Suspense } from 'react';

import { Navbar } from './_components/navbar';
import { Sidebar, SidebarSkeleton } from './_components/sidebar';
import { Container } from './_components/Container';

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                {/* TODO: Perhaps it is better to use Resizable component
                 https://ui.shadcn.com/docs/components/resizable */}
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>{children}</Container>
            </div>
        </>
    );
};

export default BrowseLayout;
