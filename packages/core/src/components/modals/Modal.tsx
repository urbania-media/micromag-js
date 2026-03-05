/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';

import { getDisplayName } from '../../utils';

import Portal from './Portal';

import styles from '../../styles/modals/modal.module.css';

interface ModalProps {
    id?: string | null;
    title?: string | null;
    position?: 'center' | 'top';
    children?: React.ReactNode | null;
}

function Modal({ id = null, children = null, position = 'center', title = null }: ModalProps) {
    const finalId = useMemo(() => id || getDisplayName(children.type), [id, children.type]);
    const data = useMemo(
        () => ({
            title,
        }),
        [title],
    );
    return (
        <Portal id={finalId} data={data}>
            <div
                className={classNames([
                    styles.container,
                    {
                        [styles[position]]: position !== null,
                    },
                ])}
            >
                <div className={classNames([styles.inner, 'bg-dark', 'rounded'])}>{children}</div>
            </div>
        </Portal>
    );
}

export default Modal;
