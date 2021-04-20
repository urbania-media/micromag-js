/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useGesture } from 'react-use-gesture';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, isValidUrl } from '@micromag/core/utils';
import { Button } from '@micromag/core/components';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    elRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
    disabled: PropTypes.bool,
    animationDisabled: PropTypes.bool,
    callToAction: MicromagPropTypes.callToAction,
    dragAmount: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    elRef: null,
    disabled: false,
    animationDisabled: false,
    callToAction: null,
    dragAmount: 50,
    className: null,
};

const isIOS = () =>
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
        navigator.platform,
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

const CallToAction = ({
    elRef,
    disabled,
    animationDisabled,
    callToAction,
    dragAmount,
    className,
}) => {
    const { active = false, type = null, url = null, label = null } = callToAction || {};

    const swipeUpEnabled = type === null || type === 'swipe-up';
    const validUrl = useMemo(() => isValidUrl(url), [url]);

    const buttonRef = useRef(null);

    const { textStyle: { fontSize = null, color = null } = {} } = label || {};
    const arrowStyle = useMemo(() => ({ ...{ fontSize }, ...getStyleFromColor(color, 'color') }), [
        fontSize,
        color,
    ]);

    const bind = useGesture({
        // fix firefox https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
        onDrag: ({ event }) => {
            event.preventDefault();
        },
        onDragEnd: ({ movement: [, my] }) => {
            if (my < -dragAmount) {
                if (isIOS()) {
                    window.location = url;
                } else {
                    buttonRef.current.click();
                }
            }
        }
    }, { drag: { useTouch: true } });

    return active ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.disabled]: disabled,
                    [styles.animationDisabled]: animationDisabled,
                    [styles.invalidUrl]: !validUrl,
                },
            ])}
            ref={elRef}
        >
            <Button
                href={url}
                external
                className={styles.button}
                withoutStyle
                refButton={buttonRef}
                {...(swipeUpEnabled && !disabled ? bind() : null)}
            >
                {swipeUpEnabled ? (
                    <FontAwesomeIcon
                        className={styles.arrow}
                        style={arrowStyle}
                        icon={faChevronUp}
                    />
                ) : null}
                <span className={styles.label}>
                    <Text {...label} inline />
                </span>
            </Button>
        </div>
    ) : null;
};

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <CallToAction elRef={ref} {...props} />);
