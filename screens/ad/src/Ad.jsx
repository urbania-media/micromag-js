import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholder } from '@micromag/core';
// import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    target: MicromagPropTypes.target,
    iframe: PropTypes.string,
    image: MicromagPropTypes.image,
    isFullScreen: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    url: null,
    target: '_blank',
    iframe: null,
    image: null,
    isFullScreen: true,
    isPlaceholder: false,
    className: null,
};

const Ad = ({
    width,
    height,
    url,
    iframe,
    image,
    target,
    isFullScreen,
    isPlaceholder,
    className,
}) => {
    // const { width: screenWidth, height: screenHeight } = useScreenSize();
    const innerStyle = {
        width,
        height,
    };
    const inner = iframe ? (
        <iframe className={styles.iframe} src={iframe} title="iframe" />
    ) : (
        <img className={styles.content} src={image} alt="Ad" />
    );

    const content =
        url !== null ? (
            <a href={url} target={target} rel="noopener noreferer">
                {inner}
            </a>
        ) : (
            inner
        );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isFullScreen]: isFullScreen,
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner} style={!isPlaceholder ? innerStyle : null}>
                {isPlaceholder ? <Placeholder className={styles.placeholder} /> : content}
            </div>
        </div>
    );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default Ad;
