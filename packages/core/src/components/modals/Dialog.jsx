/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';

import Buttons from '../buttons/Buttons';
import Label from '../partials/Label';

import styles from '../../styles/modals/dialog.module.scss';

const propTypes = {
    title: MicromagPropTypes.label,
    header: PropTypes.node,
    children: PropTypes.node,
    footer: PropTypes.node,
    size: PropTypes.string,
    buttons: MicromagPropTypes.buttons,
    onClose: PropTypes.func,
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
};

const defaultProps = {
    title: null,
    header: null,
    children: null,
    footer: null,
    size: null,
    buttons: null,
    onClose: null,
    className: null,
    bodyClassName: null,
};

const ModalDialog = ({
    title,
    header,
    children,
    buttons,
    footer,
    size,
    onClose,
    className,
    bodyClassName,
}) => (
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

ModalDialog.propTypes = propTypes;
ModalDialog.defaultProps = defaultProps;

export default ModalDialog;
