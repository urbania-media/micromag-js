/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import RichButton from './RichButton';

import aquarius from '../../../.storybook/data/files/signs/aquarius.png';
import aries from '../../../.storybook/data/files/signs/aries.png';

export default {
    component: RichButton,
    title: 'Elements/RichButton',
};

const textStyle = {
    color: { color: '#ffffff' },
    fontSize: 16,
    fontStyle: {
        bold: true,
    },
};

const buttonStyle = {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: { color: '#4a90e2' },
    backgroundColor: { color: '#4a90e2', alpha: 0.8 },
    borderRadius: 8,
    padding: 12,
};

const imageMedia = {
    type: 'image',
    url: aries,
    thumbnail_url: aries,
    metadata: {
        width: 200,
        height: 200,
    },
};

const imageMedia2 = {
    type: 'image',
    url: aquarius,
    thumbnail_url: aquarius,
    metadata: {
        width: 200,
        height: 200,
    },
};

// Basic examples
export const Default = () => (
    <RichButton body="Click me" media={imageMedia} visualWidth={60} visualHeight={60} />
);

export const TextOnly = () => (
    <RichButton body="Text only button" textStyle={textStyle} buttonStyle={buttonStyle} />
);

export const ImageOnly = () => (
    <RichButton media={imageMedia} visualWidth={80} visualHeight={80} buttonStyle={buttonStyle} />
);

// Layout variations
export const LayoutLabelBottom = () => (
    <RichButton
        body="Aries Sign"
        media={imageMedia}
        layout="label-bottom"
        visualWidth={100}
        visualHeight={100}
        textStyle={textStyle}
        buttonStyle={buttonStyle}
    />
);

export const LayoutLabelTop = () => (
    <RichButton
        body="Aquarius Sign"
        media={imageMedia2}
        layout="label-top"
        visualWidth={100}
        visualHeight={100}
        textStyle={textStyle}
        buttonStyle={buttonStyle}
    />
);

export const LayoutNoLabel = () => (
    <RichButton
        body="This text won't show"
        media={imageMedia}
        layout="no-label"
        visualWidth={100}
        visualHeight={100}
        buttonStyle={buttonStyle}
    />
);

export const LayoutLabelOver = () => (
    <RichButton
        body="Label Overlay"
        media={imageMedia}
        layout="label-over"
        visualWidth={150}
        visualHeight={150}
        textStyle={{
            ...textStyle,
            color: { color: '#ffffff' },
        }}
        buttonStyle={{
            ...buttonStyle,
            padding: 0,
        }}
    />
);

// Styled examples
export const WithCustomStyles = () => (
    <RichButton
        body="Custom Styled Button"
        media={imageMedia}
        visualWidth={80}
        visualHeight={80}
        layout="label-bottom"
        textStyle={{
            color: { color: '#ff4dff' },
            fontSize: 18,
            fontStyle: {
                bold: true,
                italic: true,
            },
        }}
        buttonStyle={{
            borderWidth: 3,
            borderStyle: 'dashed',
            borderColor: { color: '#ff4dff' },
            backgroundColor: { color: '#242235', alpha: 1 },
            borderRadius: 16,
            padding: 16,
        }}
    />
);

export const MultipleButtons = () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <RichButton
            body="Button 1"
            media={imageMedia}
            layout="label-bottom"
            visualWidth={60}
            visualHeight={60}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
        />
        <RichButton
            body="Button 2"
            media={imageMedia2}
            layout="label-bottom"
            visualWidth={60}
            visualHeight={60}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
        />
        <RichButton
            body="Button 3"
            media={imageMedia}
            layout="label-top"
            visualWidth={60}
            visualHeight={60}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
        />
    </div>
);

export const Interactive = () => {
    const handleClick = () => {
        // Button click handler
    };

    return (
        <RichButton
            body="Click Me!"
            media={imageMedia}
            layout="label-bottom"
            visualWidth={80}
            visualHeight={80}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
            onClick={handleClick}
        />
    );
};
