/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import MediaField from './Media';

const propTypes = {
    value: MicromagPropTypes.fontMedia,
};

const defaultProps = {
    value: null,
};

const FontField = (props) => (
    <MediaField
        noValueLabel={
            <FormattedMessage
                defaultMessage="Select a font file..."
                description="Label when no value"
            />
        }
        {...props}
        type="font"
    />
);

FontField.propTypes = propTypes;
FontField.defaultProps = defaultProps;
FontField.withForm = true;

export default FontField;
