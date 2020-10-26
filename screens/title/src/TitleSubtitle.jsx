/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Title from './Title';

const TitleSubtitle = ({ ...props }) => (
    <Title
        {...props}
        withSubtitle
    />
);

export default TitleSubtitle;
