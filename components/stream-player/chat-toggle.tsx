'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { useChatSidebar } from '@/store/use-chat-sidebar';
import { Hint } from '../Hint';
import { Button } from '../ui/button';

export const ChatToggle = () => {
    const { collapsed, onExpand, onCollapse } = useChatSidebar(state => state);

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    };

    const label = collapsed ? 'Expand Chat' : 'Collapse Chat';

    return (
        <Hint label={label} asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto bg-transparent p-2 hover:bg-white/10 hover:text-primary"
            >
                <Icon className="size-4" />
            </Button>
        </Hint>
    );
};
