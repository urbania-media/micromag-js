/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Title from './Title';

const propTypes = {
    credits: MicromagPropTypes.textElement,
};

const defaultProps = {
    credits: null,
};

const TitleSubtitleCredits = ({ credits, ...props }) => (
    <Title
        {...props}
        description={credits}
        withSubtitle
        withDescription
        descriptionEmptyLabel={
            <FormattedMessage defaultMessage="Credits" description="Credits placeholder" />
        }
    />
);

TitleSubtitleCredits.propTypes = propTypes;
TitleSubtitleCredits.defaultProps = defaultProps;

export default TitleSubtitleCredits;
