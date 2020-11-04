/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    className: null,
};

const AddButton = ({ className, children, ...props }) => (
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
        <span
            className={classNames([
                {
                    [styles.withLabel]: children !== null,
                },
            ])}
        >
            <FontAwesomeIcon icon={faPlus} />
        </span>
        {children}
    </Button>
);

AddButton.propTypes = propTypes;
AddButton.defaultProps = defaultProps;

export default AddButton;
