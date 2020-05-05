/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const CardField = props => <Fields isList {...props} />;

CardField.propTypes = propTypes;
CardField.defaultProps = defaultProps;

export default CardField;
