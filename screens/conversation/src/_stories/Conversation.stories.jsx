/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ConversationScreen from '../Conversation';
import definition from '../definition';
import { images } from '../../../../.storybook/data';

export default {
    title: 'Screens/Conversation',
    component: ConversationScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

const myImages = images({ count: 4 });

const speakers = [
    {
        id: 'paulo',
        name: 'Paulo',
        avatar: myImages[0],
        color: { color: '#f23', alpha: 1 },
        side: 'right',
    },
    {
        id: 'jojolapinou',
        name: 'Jojolapinou',
        avatar: myImages[1],
        color: { color: '#e00997', alpha: 1 },
        side: 'left',
    },
];

const conversationMessages = [
    {
        message: 'Bonjour ça va?',
        speaker: 'jojolapinou',
        image: myImages[2],
    },
    {
        message: 'Mais oui super bien &#129409;, et toi haha? Loooool',
        speaker: 'paulo',
    },
    {
        message: "Mouais bof... J'ai pas eu ma poutine",
        speaker: 'jojolapinou',
    },
    {
        message: "C'est pas cool sérieux",
        speaker: 'jojolapinou',
    },
    {
        message: 'Oui je te le dis...',
        speaker: 'jojolapinou',
    },
    {
        message: 'Ah ouinnnn ?',
        speaker: 'paulo',
    },
    {
        message: "T'es pas sérieuux??!!!",
        speaker: 'paulo',
    },
    {
        message: '#VDM #MaVieSansPoutine',
        speaker: 'paulo',
    },
    {
        message: 'Ouais man... Cet ostie en avait pu câliss...',
        speaker: 'jojolapinou',
        image: myImages[3],
    },
    {
        message: "T'es pas sérieuux??!!!erere",
        speaker: 'paulo',
    },
    {
        message: '#VDM #MaVieSansPoutineewrwerew',
        speaker: 'paulo',
    },
    {
        message: 'Tu te répètes Paulo... tu te répètes...',
        speaker: 'jojolapinou',
        image: myImages[3],
    },
];

const conversation = {
    speakers,
    timing: 'sequenced',
    messages: conversationMessages,
};

const speakers2 = [
    {
        id: 'marco',
        name: 'Marco',
        avatar: myImages[0],
        color: { color: '#5567ff', alpha: 1 },
        side: 'right',
    },
    {
        id: 'silvesterstalone',
        name: 'Silvesterstalone',
        avatar: myImages[1],
        color: { color: '#5e6500', alpha: 1 },
        side: 'left',
    },
    {
        id: 'leo',
        name: 'Leo',
        avatar: myImages[2],
        color: { color: '#cb4534', alpha: 1 },
        side: 'left',
    },
];

const conversationMessages2 = [
    {
        message: 'Bonjour ça va?',
        speaker: 'marco',
        image: myImages[2],
    },
    {
        message: 'Bonjour ça va et toi?',
        speaker: 'silvesterstalone',
    },
    {
        message: 'Bonjour ça va et vous autre?',
        speaker: 'leo',
    },
];

const conversation2 = {
    speakers: speakers2,
    messages: conversationMessages2,
};

export const Normal = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);

export const Preview = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation2} />
);

export const Placeholder = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);
