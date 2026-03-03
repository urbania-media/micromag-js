/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React from 'react';

import Badge from './Badge';

const meta = preview.meta({
    component: Badge,
    title: 'Elements/Badge',
});

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

function BadgeContainer(props = null) {
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: '1px solid white',
                padding: 10,
            }}
        >
            <Badge {...otherProps} />
        </div>
    );
}

export const normal = meta.story(() => <Badge {...badgeProps} />);

export const contained = meta.story(() => <BadgeContainer {...badgeProps} />);
