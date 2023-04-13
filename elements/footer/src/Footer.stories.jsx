/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Footer from './Footer';

export default {
    component: Footer,
    title: 'Elements/Footer',
};

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

const FooterContainer = (props = null) => {
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
            }}
        >
            <Footer {...otherProps} />
        </div>
    );
};

export const normal = () => <Footer {...badgeProps} />;

export const contained = () => <FooterContainer {...badgeProps} />;
