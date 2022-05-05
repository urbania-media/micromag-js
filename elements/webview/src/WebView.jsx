/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@micromag/element-button';
import Close from './Close';
import styles from './styles.module.scss';

const propTypes = {
    iframeRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    closeable: PropTypes.bool,
    onClose: PropTypes.func,
    hidden: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    iframeRef: null,
    src: null,
    width: null,
    height: null,
    closeable: false,
    onClose: null,
    hidden: false,
    className: null,
};

function WebView({ iframeRef, src, width, height, closeable, onClose, hidden, className }) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.closeable]: closeable,
                    [className]: className !== null,
                },
            ])}
            style={{ width, height }}
        >
            {closeable ? (
                <div className={styles.top}>
                    <Button className={styles.close} onClick={onClose}>
                        <Close />
                    </Button>
                </div>
            ) : null}
            {!hidden ? (
                <iframe className={styles.iframe} ref={iframeRef} title="Popup" src={src} />
            ) : null}
        </div>
    );
}

WebView.propTypes = propTypes;
WebView.defaultProps = defaultProps;

export default WebView;
