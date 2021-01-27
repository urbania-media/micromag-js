/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
import FontField from './Font';

const propTypes = {
    value: MicromagPropTypes.imageMedias,
};

const defaultProps = {
    value: null,
};

const FontsField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No font..."
                description="Label when there is no item"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add an font file"
                description="Button label"
            />
        }
        itemComponent={FontField}
        {...props}
    />
);

FontsField.propTypes = propTypes;
FontsField.defaultProps = defaultProps;

export default FontsField;
