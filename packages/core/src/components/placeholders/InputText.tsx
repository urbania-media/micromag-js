/* eslint-disable react/prop-types */
import React from 'react';

import PlaceholderBlock from '../partials/PlaceholderBlock';

export const InputText = ({ width = '75%', height = '0.5em', className }) => (
    <PlaceholderBlock outline width={width} height={height} className={className} />
);

export default InputText;
