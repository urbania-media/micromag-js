/* eslint-disable react/jsx-props-no-spreading */
import { footer } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Footer from './Footer';

const meta = preview.meta({
    component: Footer,
    title: 'Elements/Footer',
});

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

function FooterContainer(props = null) {
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
            }}
        >
            <Footer {...footer()} {...otherProps} />
        </div>
    );
}

export const normal = meta.story(() => <Footer {...badgeProps} />);

export const contained = meta.story(() => <FooterContainer {...badgeProps} />);
