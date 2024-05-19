import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const SignInButton = () => {
    return (
        <Button variant="primary" size="sm">
            <Link href="/sign-in">Login</Link>
        </Button>
    );
};
