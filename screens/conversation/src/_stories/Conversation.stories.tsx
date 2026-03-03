/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    audioConversation as makeAudioConversation,
    conversation as makeConversation,
    title,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import ConversationScreen from '../Conversation';
import definition from '../definition';

const meta = preview.meta({
    title: 'Screens/Conversation',
    component: ConversationScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

// const myImages = images({ count: 4 });

const conversation = makeConversation(13, 2);
const conversation2 = makeConversation(13, 5, 'instant');
const voiceConversation = makeAudioConversation(4, 2, 'sequence');

export const Normal = meta.story((args) => (
    <ConversationScreen
        {...args}
        conversation={conversation}
        timing={conversation.timing}
        title={{ body: title(1) }}
    />
));

export const Preview = meta.story((args) => (
    <ConversationScreen {...args} conversation={conversation2} timing={conversation2.timing} />
));

export const Placeholder = meta.story((args) => (
    <ConversationScreen {...args} conversation={conversation} />
));

export const Static = meta.story((args) => (
    <ConversationScreen {...args} conversation={conversation} />
));

export const Edit = meta.story((args) => (
    <ConversationScreen {...args} conversation={conversation} />
));

export const WithHeaderFooter = meta.story((args) => (
    <ConversationScreen
        {...args}
        {...headerFooter()}
        background={backgroundColor()}
        conversation={conversation}
        timing="instant"
    />
));

export const AudioMessages = meta.story((args) => (
    <ConversationScreen
        {...args}
        conversation={voiceConversation}
        timing={voiceConversation.timing}
        title={{ body: title(1) }}
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
