import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import styles from '../../styles/menus/menu-dot.module.scss';

const propTypes = {
    current: PropTypes.bool,
    active: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    count: PropTypes.number,
    subIndex: PropTypes.number,
    vertical: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    current: false,
    active: false,
    colors: null,
    count: 1,
    subIndex: 0,
    vertical: false,
    onClick: null,
    className: null,
};

const ViewerMenuDot = ({
    current,
    active,
    colors,
    count,
    subIndex,
    vertical,
    onClick,
    className,
}) => {
    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(255, 255, 255, 0.25)' } =
        colors || {};

    const [dotSpringStyles, setDotSpringProps] = useSpring(() => ({
        scaleX: 0,
        config: {
            tension: 200,
            friction: 30,
        },
    }));

    useEffect(() => {
        const activeRatio = active ? 1 : 0;
        const ratio = count > 1 && current ? (subIndex + 1) / count : activeRatio;
        const scaleX = ratio;
        setDotSpringProps.start({ scaleX, immediate: !current });
    }, [active, current, subIndex, count, setDotSpringProps]);

    return (
        <li
            className={classNames([
                styles.container,
                {
                    [styles.active]: current,
                    [styles.vertical]: vertical,
                    [className]: className !== null,
                },
            ])}
            aria-hidden="true"
        >
            <button type="button" className={styles.button} onClick={onClick} tabIndex="-1">
                <div
                    className={styles.dot}
                    style={{
                        backgroundColor: secondary,
                    }}
                >
                    <animated.div
                        className={styles.progress}
                        style={{
                            ...dotSpringStyles,
                            backgroundColor: primary,
                        }}
                    />
                </div>
            </button>
        </li>
    );
};
ViewerMenuDot.propTypes = propTypes;
ViewerMenuDot.defaultProps = defaultProps;

export default ViewerMenuDot;
