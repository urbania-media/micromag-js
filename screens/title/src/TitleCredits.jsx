/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Title from './Title';

const propTypes = {
    credits: MicromagPropTypes.textElement,
};

const defaultProps = {
    credits: null,
};

const TitleCredits = ({ credits, ...props }) => (
    <Title
        description={credits}
        {...props}
        withDescription
        descriptionEmptyLabel={
            <FormattedMessage defaultMessage="Credits" description="Credits placeholder" />
        }
    />
);

TitleCredits.propTypes = propTypes;
TitleCredits.defaultProps = defaultProps;

export default TitleCredits;
