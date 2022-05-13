/* eslint-disable react/no-array-index-key */
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styles from '../../styles/partials/collapsable-panel.module.scss';
import Button from '../buttons/Button';

const propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    topClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    openedClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
};

const defaultProps = {
    title: null,
    children: null,
    className: null,
    topClassName: null,
    contentClassName: null,
    openedClassName: null,
    buttonClassName: null,
};

const CollapsablePanel = ({
    title,
    children,
    className,
    topClassName,
    contentClassName,
    openedClassName,
    buttonClassName,
}) => {
    const [opened, setOpened] = useState(false);
    const onClick = useCallback(() => setOpened(!opened), [opened, setOpened]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isOpened]: opened,
                    [openedClassName]: opened && openedClassName !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    styles.top,
                    {
                        [topClassName]: topClassName !== null,
                    },
                ])}
            >
                <Button
                    withoutStyle
                    className={classNames([
                        styles.button,
                        {
                            [buttonClassName]: buttonClassName !== null,
                        },
                    ])}
                    icon={
                        <FontAwesomeIcon
                            icon={opened ? faAngleUp : faAngleDown}
                            className={styles.icon}
                        />
                    }
                    iconPosition="right"
                    labelClassName={styles.label}
                    onClick={onClick}
                >
                    {title}
                </Button>
            </div>
            <div
                className={classNames([
                    styles.content,
                    {
                        [contentClassName]: contentClassName !== null,
                    },
                ])}
            >
                {children}
            </div>
        </div>
    );
};

CollapsablePanel.propTypes = propTypes;
CollapsablePanel.defaultProps = defaultProps;

export default CollapsablePanel;
