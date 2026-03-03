/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';


import Buttons from '../buttons/Buttons';
import Label from '../partials/Label';

import styles from '../../styles/modals/dialog.module.css';

interface ModalDialogProps {
    title?: Label;
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    size?: string;
    buttons?: Button[];
    onClose?: (...args: unknown[]) => void;
    className?: string;
    bodyClassName?: string;
}

function ModalDialog(
    {
        title = null,
        header = null,
        children = null,
        buttons = null,
        footer = null,
        size = null,
        onClose = null,
        className = null,
        bodyClassName = null,
    },
) {
    return (
        <div
            className={classNames([
                styles.container,
                'modal-dialog',
                {
                    [`modal-${size}`]: size !== null,
                    [className]: className,
                },
            ])}
            role="dialog"
        >
            <div className="modal-content">
                {header || (
                    <div
                        className={classNames([
                            'modal-header',
                            'p-2',
                            'd-flex',
                            'justify-content-between',
                            styles.header,
                        ])}
                    >
                        <h5 className="modal-title">
                            <Label>{title}</Label>
                        </h5>
                        <button
                            type="button"
                            className="btn btn-close p-2"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>
                )}
                <div
                    className={classNames([
                        'modal-body',
                        'p-2',
                        {
                            [bodyClassName]: bodyClassName !== null,
                        },
                    ])}
                >
                    {children}
                </div>
                {footer !== null || buttons !== null ? (
                    <div className={classNames(['modal-footer', 'p-2', styles.footer])}>
                        {footer}
                        {buttons !== null ? (
                            <Buttons buttons={buttons} className={styles.buttons} />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ModalDialog;
