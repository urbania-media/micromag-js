/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import ItemsField from './Items';
import SlideField from './Slide';

const propTypes = {};

const defaultProps = {};

const SlidesField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No slide..."
                description="Label when there is no item in slides field"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add a slide"
                description="Button label in slides field"
            />
        }
        ItemComponent={SlideField}
        {...props}
    />
);

SlidesField.propTypes = propTypes;
SlidesField.defaultProps = defaultProps;

export default SlidesField;
