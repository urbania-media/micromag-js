/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import ItemsField from './Items';
import MarkerField from './Marker';

const propTypes = {};

const defaultProps = {};

const MarkersField = (props) => (
    <ItemsField
        noItemLabel={
            <FormattedMessage
                defaultMessage="No marker..."
                description="Label when there is no item in markers field"
            />
        }
        addItemLabel={
            <FormattedMessage
                defaultMessage="Add a marker"
                description="Button label in markers field"
            />
        }
        ItemComponent={MarkerField}
        {...props}
    />
);

MarkersField.propTypes = propTypes;
MarkersField.defaultProps = defaultProps;

export default MarkersField;
