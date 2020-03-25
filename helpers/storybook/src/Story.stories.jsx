import React from 'react';
import Story from './Story';
import StoryByLayout from './StoryByLayout';

const Component = () => <p>I am a story</p>;

export default {
    component: Story,
    title: 'Helpers/Storybook/Story',
};

export const Small = () => (
    <Story width={100} height={100}>
        <p>I am a tiny story</p>
    </Story>
);

export const Placeholder = () => (
    <Story isPlaceholder>
        <p>I am a placeholder story</p>
    </Story>
);

export const Preview = () => (
    <Story isPreview>
        <p>I am a preview story</p>
    </Story>
);

export const Normal = () => (
    <Story>
        <p>I am a story</p>
    </Story>
);

export const ByLayout = () => <StoryByLayout layout={{ name: 'Test' }} component={Component} />;

export const ByLayoutPlaceholder = () => (
    <StoryByLayout
        layout={{ name: 'Test' }}
        component={Component}
        storyProps={{ isPlaceholder: true }}
    />
);
