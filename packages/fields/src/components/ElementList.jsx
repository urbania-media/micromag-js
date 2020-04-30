/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import ElementField from './Element';

const propTypes = {};

const defaultProps = {};

const ElementList = props => <ElementField isList {...props} />;

ElementList.propTypes = propTypes;
ElementList.defaultProps = defaultProps;

export default ElementList;
