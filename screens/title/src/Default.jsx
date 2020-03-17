/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Heading from '@micromag/component-heading';
import Text from '@micromag/component-text';
import { PropTypes as MicromagPropTypes, Placeholder } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './title.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    title: MicromagPropTypes.headingComponent,
    subtitle: MicromagPropTypes.headingComponent,
    description: MicromagPropTypes.textComponent,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    title: null,
    subtitle: null,
    description: null,
    isPlaceholder: false,
    className: null,
};

const DefaultTitleScreen = ({
    background,
    title,
    subtitle,
    description,
    isPlaceholder,
    className,
}) => {
    const { width, height } = useScreenSize();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className,
                },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.middle}>
                    {isPlaceholder ? (
                        <>
                            <Placeholder height={3} className={styles.title} />
                            <Placeholder height={2} lines={2} className={styles.subtitle} />
                            <Placeholder height={1} lines={3} className={styles.description} />
                        </>
                    ) : (
                        <>
                            {title !== null ? (
                                <Heading {...title} size={1} className={styles.title} />
                            ) : null}
                            {subtitle !== null ? (
                                <Heading {...subtitle} size={2} className={styles.subtitle} />
                            ) : null}
                            {description !== null ? (
                                <Text {...description} className={styles.description} />
                            ) : null}
                        </>
                    )}
                </div>
            </div>
            <Background
                {...background}
                width={width}
                height={height}
                className={styles.background}
            />
        </div>
    );
};

DefaultTitleScreen.propTypes = propTypes;
DefaultTitleScreen.defaultProps = defaultProps;

export default DefaultTitleScreen;
