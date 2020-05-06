/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import ItemsField from './Items';
import SlideField from './Slide';

const messages = defineMessages({
    noSlide: {
        id: 'slides.no_slide',
        defaultMessage: 'No slide...',
    },
    addSlide: {
        id: 'slides.add_slide',
        defaultMessage: 'Add a slide',
    },
});

const propTypes = {};

const defaultProps = {};

const SlidesField = props => (
    <ItemsField
        noItemLabel={messages.noSlide}
        addItemLabel={messages.addSlide}
        ItemComponent={SlideField}
        {...props}
    />
);

SlidesField.propTypes = propTypes;
SlidesField.defaultProps = defaultProps;

export default SlidesField;
