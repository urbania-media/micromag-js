/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from './Portal';

import styles from '../../styles/modals/modal.module.scss';

const propTypes = {
    position: PropTypes.oneOf(['center', 'top']),
    children: PropTypes.node,
};

const defaultProps = {
    position: 'center',
    children: null,
};

const Modal = ({ children, position }) => (
    <Portal>
        <div
            className={classNames([
                styles.container,
                {
                    [styles[position]]: position !== null,
                },
            ])}
        >
            <div className={styles.inner}>{children}</div>
        </div>
    </Portal>
);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
