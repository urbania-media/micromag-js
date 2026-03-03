/* eslint-disable react/no-array-index-key */
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import Button from '../buttons/Button';

import styles from '../../styles/partials/collapsable-panel.module.css';

interface CollapsablePanelProps {
    title?: React.ReactNode | null;
    children?: React.ReactNode | null;
    className?: string | null;
    topClassName?: string | null;
    contentClassName?: string | null;
    openedClassName?: string | null;
    buttonClassName?: string | null;
}

function CollapsablePanel({
    title = null,
    children = null,
    className = null,
    topClassName = null,
    contentClassName = null,
    openedClassName = null,
    buttonClassName = null,
}: CollapsablePanelProps) {
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
}

export default CollapsablePanel;
