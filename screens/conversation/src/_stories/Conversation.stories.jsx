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
        color: '#f23',
    },
    {
        id: 'jojolapinou',
        name: 'Jojolapinou',
        avatar: myImages[1],
        color: '#e00997',
    },
];

const conversationMessages = [
    {
        message: 'Bonjour ça va?',
        speakerId: 'jojolapinou',
        image: myImages[2],
    },
    {
        message: 'Mais oui super bien :), et toi haha? Loooool',
        speakerId: 'paulo',
    },
    {
        message: "Mouais bof... J'ai pas eu ma poutine",
        speakerId: 'jojolapinou',
    },
    {
        message: 'Ah ouinnnn ?',
        speakerId: 'paulo',
    },
    {
        message: "T'es pas sérieuux??!!!",
        speakerId: 'paulo',
    },
    {
        message: '#VDM #MaVieSansPoutine',
        speakerId: 'paulo',
    },
    {
        message: 'Ouais man... Cet ostie en avait pu câliss...',
        speakerId: 'jojolapinou',
        image: myImages[3],
    },
];

const conversation = {
    speakers,
    // textStyle,
    messages: conversationMessages,
};

export const Normal = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);
