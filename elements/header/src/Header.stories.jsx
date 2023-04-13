/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Header from './Header';

export default {
    component: Header,
    title: 'Elements/Header',
};

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

const HeaderContainer = (props = null) => {
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
            }}
        >
            <Header {...otherProps} />
        </div>
    );
};

export const normal = () => <Header {...badgeProps} />;

export const contained = () => <HeaderContainer {...badgeProps} />;
