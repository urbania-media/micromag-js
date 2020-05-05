/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const MapField = props => <Fields isList {...props} />;

MapField.propTypes = propTypes;
MapField.defaultProps = defaultProps;

export default MapField;
