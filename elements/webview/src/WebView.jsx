/* eslint-disable react/jsx-props-no-spreading */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@micromag/element-button';
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
    className: PropTypes.string,
};

const defaultProps = {
    iframeRef: null,
    src: null,
    width: null,
    height: null,
    closeable: false,
    onClose: null,
    className: null,
};

function WebView({ iframeRef, src, width, height, closeable, onClose, className }) {
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
                        <FontAwesomeIcon className={styles.icon} icon={faTimes} size="lg" />
                    </Button>
                </div>
            ) : null}
            <iframe className={styles.iframe} ref={iframeRef} title="Popup" src={src} />
        </div>
    );
}

WebView.propTypes = propTypes;
WebView.defaultProps = defaultProps;

export default WebView;
