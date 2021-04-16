/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ItemsField from './Items';
import VisualField from './Visual';

const propTypes = {
    value: MicromagPropTypes.imageMedias,
};

const defaultProps = {
    value: null,
};

const VisualsField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No visual..."
                description="Label when there is no item in visuals field"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add a visual"
                description="Button label in visuals field"
            />
        }
        itemComponent={VisualField}
        {...props}
    />
);

VisualsField.propTypes = propTypes;
VisualsField.defaultProps = defaultProps;

export default VisualsField;
