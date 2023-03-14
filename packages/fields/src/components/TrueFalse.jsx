/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import Checkboxes from './Checkboxes';

const propTypes = {
    value: PropTypes.shape({}),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.node,
        }),
    ),
    onChange: PropTypes.func,
};

const defaultProps = {
    options: [
        {
            value: true,
            label: (
                <>
                    <FontAwesomeIcon className="me-1" icon={faCheck} />
                    <FormattedMessage defaultMessage="True" description="Field label" />
                </>
            ),
        },
        {
            value: false,
            label: (
                <>
                    <FontAwesomeIcon className="me-1" icon={faTimes} />
                    <FormattedMessage defaultMessage="False" description="Field label" />
                </>
            ),
        },
        {
            value: null,
            label: (
                <>
                    <FontAwesomeIcon className="me-1" icon={faCircle} />
                    <FormattedMessage defaultMessage="None" description="Field label" />
                </>
            ),
        },
    ],
    value: null,
    onChange: null,
};

const TrueFalse = ({ value, options, onChange, ...props }) => {
    const onInputChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <Checkboxes
            value={value}
            options={options}
            onChange={onInputChange}
            singleChoice
            {...props}
        />
    );
};

TrueFalse.propTypes = propTypes;
TrueFalse.defaultProps = defaultProps;

export default TrueFalse;
