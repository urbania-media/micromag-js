/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/buttons/clear.module.css';

const propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

const ClearButton = ({ onClick = null, className = null, ...props }) => (
    <button
        className={classNames([
            styles.container,
            {
                [className]: className,
            },
        ])}
        onClick={onClick}
        {...props}
    >
        <FontAwesomeIcon className={styles.icon} icon={faClose} size="md" />
    </button>
);

ClearButton.propTypes = propTypes;

export default ClearButton;
