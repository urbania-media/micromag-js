/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Badge from './Badge';

export default {
    component: Badge,
    title: 'Elements/Badge',
};

const badgeProps = {
    active: true,
    label: { body: 'My badge 2032' },
};

const BadgeContainer = (props = null) => {
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
};

export const normal = () => <Badge {...badgeProps} />;

export const contained = () => <BadgeContainer {...badgeProps} />;
