/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
// import ImageField from './Image';

const propTypes = {
    value: MicromagPropTypes.imageMedias,
};

const defaultProps = {
    value: null,
};

const ImagesWithCaptionField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No image..."
                description="Label when there is no item in images field"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add an image"
                description="Button label in images field"
            />
        }
        {...props}
    />
);

ImagesWithCaptionField.propTypes = propTypes;
ImagesWithCaptionField.defaultProps = defaultProps;

export default ImagesWithCaptionField;
