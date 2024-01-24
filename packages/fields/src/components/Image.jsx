/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const propTypes = {
    value: MicromagPropTypes.imageMedia,
};

const defaultProps = {
    value: null,
};

const ImageField = (props) => (
    <MediaField
        noValueLabel={
            <FormattedMessage
                defaultMessage="Select an image..."
                description="Label when no value is provided to Image field"
            />
        }
        {...props}
        type="image"
    />
);

ImageField.propTypes = propTypes;
ImageField.defaultProps = defaultProps;
ImageField.withForm = true;

export default ImageField;
