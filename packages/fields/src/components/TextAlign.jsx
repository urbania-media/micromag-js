/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Radios from './Radios';

const propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

const defaultProps = {
    options: [
        { value: 'left', label: <FontAwesomeIcon icon={faAlignLeft} /> },
        { value: 'center', label: <FontAwesomeIcon icon={faAlignCenter} /> },
        { value: 'right', label: <FontAwesomeIcon icon={faAlignRight} /> },
    ],
    value: null,
    onChange: null,
};

const TextAlign = ({ value, options, onChange, ...props }) => (
    <Radios value={value} options={options} onChange={onChange} uncheckable {...props} />
);

TextAlign.propTypes = propTypes;
TextAlign.defaultProps = defaultProps;

export default TextAlign;
