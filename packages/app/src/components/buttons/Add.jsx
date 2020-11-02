/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AddButton = ({ className, ...props }) => (
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
        <FontAwesomeIcon icon={faPlus} />
    </Button>
);

AddButton.propTypes = propTypes;
AddButton.defaultProps = defaultProps;

export default AddButton;
