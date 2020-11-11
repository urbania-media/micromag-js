/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import { Button, DropdownMenu } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    children: null,
};

const SettingsButton = ({ className, children, ...props }) => {
    const [open, setOpen] = useState(false);
    const onClick = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);
    return (
        <div className="dropdown">
            <Button
                className={classNames([
                    styles.container,
                    'btn-primary',
                    'dropdown-toggle',
                    {
                        [className]: className !== null,
                    },
                ])}
                {...props}
                icon={<FontAwesomeIcon icon={faCogs} color="currentColor" />}
                onClick={onClick}
            />
            <DropdownMenu className={styles.dropdown} visible={open}>
                {children}
            </DropdownMenu>
        </div>
    );
};

SettingsButton.propTypes = propTypes;
SettingsButton.defaultProps = defaultProps;

export default SettingsButton;
