/* eslint-disable react/destructuring-assignment, react/prop-types */
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

export function Button({ width = '75%', height = '0.4em', className }) {
    return (
        <PlaceholderBlock outline width={width} height={height} className={className}>
            <PlaceholderText line={1} height="0.1em" />
        </PlaceholderBlock>
    );
}

export default Button;
