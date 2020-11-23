/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const BackButton = ({ className, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            'btn-primary',
            {
                [className]: className !== null,
            },
        ])}
        {...props}
    >
        <FontAwesomeIcon icon={faChevronLeft} color="currentColor" />
    </Button>
);

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
