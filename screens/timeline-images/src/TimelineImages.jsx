import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Placeholders } from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    // props from fields
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineImages = ({ isPreview, isPlaceholder, className }) => {
    // Gives you the story width / height if necessary
    // const { width, height } = useScreenSize();
    // const innerStyle = {
    //     width,
    //     height,
    // };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPreview]: isPreview,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                {isPlaceholder ? <Placeholders.Image className={styles.placeholder} /> : null}
            </div>
        </div>
    );
};

TimelineImages.propTypes = propTypes;
TimelineImages.defaultProps = defaultProps;

export default TimelineImages;
