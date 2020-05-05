/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Fields from './Fields';

const propTypes = {};

const defaultProps = {};

const SlideField = props => <Fields isList {...props} />;

SlideField.propTypes = propTypes;
SlideField.defaultProps = defaultProps;

export default SlideField;
