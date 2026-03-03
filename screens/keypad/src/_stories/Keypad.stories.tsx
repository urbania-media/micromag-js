/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, footer, header, headerFooter, imageMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Keypad from '../Keypad';
import definition from '../definition';

const props = {
    background: backgroundColor(),
    title: { body: 'Title' },
    items: [
        {
            id: '1',
            label: '1',
            content: {
                body: '<p>1 est un lorem ipsum dolor sit amet consectetur adipiscing lkasdhfklhds sadfdsa fhas dfh sadkfh ksadhf kashdf kjahsdf kh asdfh asdkffffhasjdfkasdhfasdhhhfsadf asdf kasdf jasdfhaksdj flashdfkjjjas djfh askjdfh kasdhf kjasdhfk ahsfdk </p>',
                largeVisual: imageMedia(),
            },
        },
        {
            id: '2',
            label: '2',
        },
        {
            id: '3',
            label: '3',
        },
        {
            id: '4',
            label: '4',
        },
        {
            id: '5',
            label: '5',
        },
        {
            id: '6',
            label: '6',
        },
        {
            id: '7',
            label: '7',
        },
        {
            id: '8',
            label: '8',
        },
    ],
};

const meta = preview.meta({
    title: 'Screens/Keypad',
    component: Keypad,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Keypad),
    },
});

export const Placeholder = meta.story((args) => <Keypad {...args} />);

export const Preview = meta.story((args) => <Keypad {...args} {...props} />);

export const Static = meta.story((args) => <Keypad {...args} {...props} />);

export const Capture = meta.story((args) => <Keypad {...args} {...props} />);

export const Edit = meta.story((args) => <Keypad {...args} />);

export const Normal = meta.story((args) => <Keypad {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <Keypad {...args} {...props} {...headerFooter()} />
));

export const WithHeader = meta.story((args) => <Keypad {...args} {...props} header={header()} />);

export const WithFooter = meta.story((args) => <Keypad {...args} {...props} footer={footer()} />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
