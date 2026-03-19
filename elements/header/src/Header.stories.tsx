import { header } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Header from './Header';

const meta = preview.meta({
    component: Header,
    title: 'Elements/Header',
});

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

function HeaderContainer(props = null) {
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
            }}
        >
            <Header {...header()} {...otherProps} />
        </div>
    );
}

export const normal = meta.story(() => <Header {...badgeProps} />);

export const contained = meta.story(() => <HeaderContainer {...badgeProps} />);
