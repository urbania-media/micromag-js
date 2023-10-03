/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    conversation as makeConversation,
    audioConversation as makeAudioConversation,
    title,
    headerFooter,
    backgroundColor,
} from '../../../../.storybook/data';
import ConversationScreen from '../Conversation';
import definition from '../definition';

export default {
    title: 'Screens/Conversation',
    component: ConversationScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

// const myImages = images({ count: 4 });

const conversation = makeConversation(13, 2);
const conversation2 = makeConversation(13, 5, 'instant');
const voiceConversation = makeAudioConversation(13, 2);

export const Normal = (storyProps) => (
    <ConversationScreen
        {...storyProps}
        conversation={conversation}
        timing={conversation.timing}
        title={{ body: title(1) }}
    />
);

export const Preview = (storyProps) => (
    <ConversationScreen
        {...storyProps}
        conversation={conversation2}
        timing={conversation2.timing}
    />
);

export const Placeholder = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);

export const Static = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);

export const Edit = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);

export const WithHeaderFooter = (storyProps) => (
    <ConversationScreen
        {...storyProps}
        {...headerFooter()}
        background={backgroundColor()}
        conversation={conversation}
        timing="instant"
    />
);

export const AudioMessages = (storyProps) => (
    <ConversationScreen
        {...storyProps}
        conversation={voiceConversation}
        timing={voiceConversation.timing}
        title={{ body: title(1) }}
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
