import React from 'react';
import Title from './Title';

const TitleCredits = ({ credits, ...props }) => <Title description={credits} {...props} descriptionPlaceholder />

export default TitleCredits;