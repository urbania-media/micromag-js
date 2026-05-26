import classNames from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';

import { Button, Label as LabelType } from '../../types';
import Buttons from '../buttons/Buttons';
import Label from '../partials/Label';

interface ModalDialogProps {
    title?: LabelType | null;
    header?: ReactNode | null;
    children?: ReactNode | null;
    footer?: ReactNode | null;
    size?: string | null;
    buttons?: Button[] | null;
    onClose?: MouseEventHandler<HTMLButtonElement> | null;
    className?: string | null;
    bodyClassName?: string | null;
}

function ModalDialog({
    title = null,
    header = null,
    children = null,
    buttons = null,
    footer = null,
    size = null,
    onClose = null,
    className = null,
    bodyClassName = null,
}: ModalDialogProps) {
    return (
        <div
            className={classNames([
                'modal-dialog',
                size !== null ? `modal-${size}` : null,
                className,
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
                <div className={classNames(['modal-body', 'p-2', bodyClassName])}>{children}</div>
                {footer !== null || buttons !== null ? (
                    <div className={classNames(['modal-footer', 'p-2'])}>
                        {footer}
                        {buttons !== null ? <Buttons buttons={buttons} /> : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ModalDialog;
