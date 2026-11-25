/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    imageMedia,
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

// A speaker with a long name (on two lines) and an avatar, on each side
const longNamesConversation = {
    timing: 'sequence',
    speakers: [
        { id: 'short', name: 'Alex, 19', avatar: imageMedia(), side: 'left' },
        {
            id: 'long',
            name: 'Sam, head of the department of product protection and patient safety',
            avatar: imageMedia(),
            side: 'right',
        },
    ],
    messages: [
        { speaker: 'short', message: 'A first message, with a few words to type.' },
        { speaker: 'long', message: 'An answer from the speaker with a long name.' },
        { speaker: 'short', message: 'Thanks!' },
    ],
};

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

export const LongSpeakerNames = meta.story((args) => (
    <ConversationScreen
        {...args}
        conversation={longNamesConversation}
        timing={longNamesConversation.timing}
        background={backgroundColor()}
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
