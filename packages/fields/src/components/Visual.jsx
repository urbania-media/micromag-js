/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const visualTypes = ['video', 'image'];

const propTypes = {
    value: MicromagPropTypes.videoMedia,
};

const defaultProps = {
    value: null,
};

const VisualField = (props) => (
    <MediaField
        noValueLabel={
            <FormattedMessage
                defaultMessage="Select an image..."
                description="Label when no value is provided to Visual field"
            />
        }
        {...props}
        type={visualTypes}
    />
);

VisualField.propTypes = propTypes;
VisualField.defaultProps = defaultProps;
VisualField.withForm = true;

export default VisualField;
