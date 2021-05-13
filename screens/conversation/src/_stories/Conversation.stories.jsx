/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import ConversationScreen from '../Conversation';
import definition from '../definition';
import { conversation as makeConversation, title, callToAction } from '../../../../.storybook/data';

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

export const WithCallToAction = (storyProps) => (
    <ConversationScreen
        {...storyProps}
        conversation={conversation}
        timing="instant"
        callToAction={callToAction()}
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
