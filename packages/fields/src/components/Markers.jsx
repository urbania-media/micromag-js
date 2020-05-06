/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import ItemsField from './Items';
import MarkerField from './Marker';

const messages = defineMessages({
    noMarker: {
        id: 'markers.no_marker',
        defaultMessage: 'No marker...',
    },
    addMarker: {
        id: 'markers.add_marker',
        defaultMessage: 'Add a marker',
    },
});

const propTypes = {};

const defaultProps = {};

const MarkersField = props => (
    <ItemsField
        noItemLabel={messages.noMarker}
        addItemLabel={messages.addMarker}
        ItemComponent={MarkerField}
        {...props}
    />
);

MarkersField.propTypes = propTypes;
MarkersField.defaultProps = defaultProps;

export default MarkersField;
