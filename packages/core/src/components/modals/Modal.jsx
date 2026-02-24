/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { getDisplayName } from '../../utils';

import Portal from './Portal';

import styles from '../../styles/modals/modal.module.css';

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    position: PropTypes.oneOf(['center', 'top']),
    children: PropTypes.node,
};

const Modal = ({ id = null, children = null, position = 'center', title = null }) => {
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
};

Modal.propTypes = propTypes;

export default Modal;
