/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import ElementField from './Element';

const propTypes = {};

const ElementList = props => <ElementField isList {...props} />;

ElementList.propTypes = propTypes;

export default ElementList;
