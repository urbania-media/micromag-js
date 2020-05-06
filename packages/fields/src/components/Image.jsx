/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const messages = defineMessages({
    noValue: {
        id: 'image.no_value',
        defaultMessage: 'Select an image...',
    },
});

const propTypes = {
    value: MicromagPropTypes.image,
};

const defaultProps = {
    value: null,
};

const ImageField = props => <MediaField noValueLabel={messages.noValue} {...props} type="image" />;

ImageField.propTypes = propTypes;
ImageField.defaultProps = defaultProps;
ImageField.withForm = true;

export default ImageField;
