/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// import * as AppPropTypes from '../../lib/PropTypes';
import { Button } from '@micromag/core';

import styles from '../../styles/buttons/close.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CloseButton = ({ className, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        withoutStyle
        icon={<FontAwesomeIcon icon={faTimes} className={styles.icon} />}
        iconPosition="right"
        {...props}
    />
);

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
