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
        side: 'right',
    },
    {
        id: 'jojolapinou',
        name: 'Jojolapinou',
        avatar: myImages[1],
        color: '#e00997',
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
    // textStyle,
    messages: conversationMessages,
};

export const Normal = (storyProps) => (
    <ConversationScreen {...storyProps} conversation={conversation} />
);
