'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ConnectionState } from 'livekit-client';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from '@livekit/components-react';
import { ChatHeader } from './chat-header';
import { ChatForm } from './chat-form';
import { ChatList } from './chat-list';

interface ChatProps {
    viewerName: string;
    hostName: string;
    hostIdentity: string;
    isFollowing: boolean;
    isChatEnable: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatDelayed,
    isChatEnable,
    isChatFollowersOnly,
}: ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { variant, onExpand } = useChatSidebar(state => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline =
        participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnable || !isOnline;

    const [value, setValue] = useState<string>('');
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue('');
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] flex-col border-b border-l bg-background pt-0">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <p>Community</p>
                </>
            )}
        </div>
    );
};
