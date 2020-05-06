/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
import ImageField from './Image';

const messages = defineMessages({
    noImage: {
        id: 'images.no_image',
        defaultMessage: 'No image...',
    },
    addImage: {
        id: 'images.add_image',
        defaultMessage: 'Add an image',
    },
});

const propTypes = {
    value: MicromagPropTypes.images,
};

const defaultProps = {
    value: null
};

const ImagesField = props => (
    <ItemsField
        noItemLabel={messages.noImage}
        addItemLabel={messages.addImage}
        ItemComponent={ImageField}
        {...props}
    />
);

ImagesField.propTypes = propTypes;
ImagesField.defaultProps = defaultProps;

export default ImagesField;
