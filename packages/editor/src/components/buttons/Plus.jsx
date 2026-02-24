/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@micromag/core/components';

import PlusIcon from '../icons/Plus';

import styles from '../../styles/buttons/plus.module.css';

const propTypes = {
    className: PropTypes.string,
};

const PlusButton = ({ className = null, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        withoutStyle
        {...props}
    >
        <PlusIcon className={styles.icon} />
    </Button>
);

PlusButton.propTypes = propTypes;

export default PlusButton;
