/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const RemoveButton = ({ className, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            'btn-dark',
            {
                [className]: className !== null,
            },
        ])}
        {...props}
    >
        <FontAwesomeIcon icon={faMinus} color="currentColor" />
    </Button>
);

RemoveButton.propTypes = propTypes;
RemoveButton.defaultProps = defaultProps;

export default RemoveButton;
