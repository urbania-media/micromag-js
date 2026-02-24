/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import Radios from './Radios';

const propTypes = {
    value: PropTypes.shape({}),
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

const TextTransform = ({ value = null, options = [
    { value: 'capitalize', label: <strong>Aa</strong> },
    { value: 'uppercase', label: <strong>AA</strong> },
    { value: 'lowercase', label: <strong>aa</strong> },
], onChange = null, ...props }) => (
    <Radios value={value} options={options} onChange={onChange} uncheckable {...props} />
);

TextTransform.propTypes = propTypes;
TextTransform.isHorizontal = true;

export default TextTransform;
