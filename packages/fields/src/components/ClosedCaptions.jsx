/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const propTypes = {
    value: MicromagPropTypes.closedCaptionsMedia,
};

const defaultProps = {
    value: null,
};

const ClosedCaptionField = (props) => (
    <MediaField
        noValueLabel={
            <FormattedMessage
                defaultMessage="Select a closed-captions file..."
                description="Label when no value is provided to Closed-captions field"
            />
        }
        {...props}
        type="closed-captions"
    />
);

ClosedCaptionField.propTypes = propTypes;
ClosedCaptionField.defaultProps = defaultProps;
ClosedCaptionField.withForm = true;

export default ClosedCaptionField;
