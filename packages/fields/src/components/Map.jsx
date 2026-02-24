/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const MapField = props => <Fields {...props} />;

MapField.propTypes = propTypes;

export default MapField;
