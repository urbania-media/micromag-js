import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
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
    className: null,
};

const Ad = ({ width, height, url, iframe, image, target, isFullScreen, className }) => {
    // const { width: screenWidth, height: screenHeight } = useScreenSize();
    const innerStyle = {
        width,
        height,
    };

    const content = iframe ? (
        <iframe className={styles.iframe} src={iframe} title="iframe" />
    ) : (
        <img className={styles.content} src={image} alt="Ad" />
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
            <div className={styles.inner} style={innerStyle}>
                {url !== null ? (
                    <a href={url} target={target} rel="noopener noreferer">
                        {content}
                    </a>
                ) : (
                    content
                )}
            </div>
        </div>
    );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default Ad;
