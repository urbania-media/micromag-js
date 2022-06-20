/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useTrackEvent } from '@micromag/core/hooks';
import { getStyleFromColor, isIos, isValidUrl } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';

import ArrowIcon from './ArrowIcon';

import styles from './styles.module.scss';

const propTypes = {
    type: PropTypes.oneOf(['click', 'swipe-up', null]),
    url: PropTypes.string,
    label: MicromagPropTypes.textElement,
    boxStyle: MicromagPropTypes.boxStyle,
    inWebView: PropTypes.bool,
    elRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
    animationDisabled: PropTypes.bool,
    icon: PropTypes.node,
    arrow: PropTypes.node,
    dragAmount: PropTypes.number,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonBorderClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    arrowClassName: PropTypes.string,
    focusable: PropTypes.bool,
    openWebView: PropTypes.func,
    onClick: PropTypes.func,
};

const defaultProps = {
    type: null,
    url: null,
    label: null,
    boxStyle: null,
    inWebView: false,
    elRef: null,
    animationDisabled: false,
    icon: null,
    arrow: null,
    dragAmount: 50,
    className: null,
    buttonClassName: null,
    buttonBorderClassName: null,
    labelClassName: null,
    arrowClassName: null,
    focusable: true,
    openWebView: null,
    onClick: null,
};

function CallToAction({
    type,
    url,
    label,
    boxStyle,
    inWebView,
    elRef,
    disabled,
    animationDisabled,
    icon,
    arrow,
    dragAmount,
    className,
    buttonClassName,
    buttonBorderClassName,
    labelClassName,
    arrowClassName,
    focusable,
    openWebView,
    onClick,
}) {
    const trackEvent = useTrackEvent();

    const swipeUpEnabled = type === null || type === 'swipe-up';
    const validUrl = useMemo(() => isValidUrl(url), [url]);
    const buttonRef = useRef(null);

    const { textStyle = null } = label || {};
    const { fontSize = null, color = null, lineHeight = null } = textStyle || {};
    const { backgroundColor = null } = boxStyle || {};

    const arrowStyle = useMemo(
        () => ({
            ...{ fontSize },
            ...(backgroundColor === null
                ? getStyleFromColor(color, 'color')
                : getStyleFromColor(backgroundColor, 'color')),
        }),
        [fontSize, backgroundColor, color],
    );

    // MobileSafari blocks popup no matter what
    const selfTargetLinkRef = useRef(null);
    const [leaving, setLeaving] = useState(false);

    // On click
    const onClickLink = useCallback(
        (e, action = 'click') => {
            if (inWebView && openWebView !== null) {
                openWebView({
                    url,
                });
            }
            if (onClick !== null && action === 'cllick') {
                onClick(e);
            }
            if (trackEvent !== null) {
                trackEvent('call_to_action', isString(action) ? action : 'click', url);
            }
        },
        [url, onClick, trackEvent, inWebView, openWebView],
    );

    const onDrag = useCallback(({ event }) => {
        // fix firefox https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
        event.preventDefault();
    }, []);

    const onDragEnd = useCallback(({ movement: [, my] }) => {
        if (my < -dragAmount) {
            if (inWebView) {
                onClickLink(null, 'swipe');
            } else if (isIos() && selfTargetLinkRef.current !== null) {
                selfTargetLinkRef.current.click();
                setLeaving(true);
                onClickLink(null, 'swipe');
            } else if (buttonRef.current) {
                buttonRef.current.click();
                onClickLink(null, 'swipe');
            }
        }
    }, [dragAmount, inWebView, onClickLink, setLeaving]);

    const bind = useGesture({
        onDrag,
        onDragEnd,
    });

    useEffect(() => {
        const onPageHide = () => {
            setLeaving(false);
        };
        window.addEventListener('pagehide', onPageHide);
        return () => {
            window.removeEventListener('pagehide', onPageHide);
        };
    }, [setLeaving]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.disabled]: disabled,
                    [styles.animationDisabled]: animationDisabled,
                    [styles.invalidUrl]: !validUrl,
                    [styles.inWebView]: inWebView,
                },
            ])}
            ref={elRef}
        >
            {leaving ? <div className={styles.leavingFrame} /> : null}
            {!inWebView && swipeUpEnabled ? (
                <a
                    className={styles.selfTargetLink}
                    href={url}
                    ref={selfTargetLinkRef}
                    tabIndex={focusable ? '0' : '-1'}
                />
            ) : null}
            {swipeUpEnabled ? (
                <div
                    className={classNames([
                        styles.arrow,
                        {
                            [arrowClassName]: arrowClassName !== null,
                        },
                    ])}
                    style={arrowStyle}
                >
                    {arrow || <ArrowIcon />}
                </div>
            ) : null}
            <div
                className={classNames([
                    styles.buttonBorder,
                    {
                        [buttonBorderClassName]: buttonBorderClassName !== null,
                    },
                ])}
            >
                <Button
                    className={classNames([
                        styles.button,
                        {
                            [buttonClassName]: buttonClassName !== null,
                        },
                    ])}
                    refButton={buttonRef}
                    focusable={focusable}
                    buttonStyle={boxStyle}
                    inline
                    href={!inWebView ? url : null}
                    external
                    onClick={onClickLink}
                    {...(swipeUpEnabled && !disabled ? bind() : null)}
                >
                    <span
                        className={classNames([
                            styles.label,
                            {
                                [labelClassName]: labelClassName !== null,
                            },
                        ])}
                    >
                        {icon !== null ? <div className={styles.icon}>{icon}</div> : null}
                        <Text
                            {...label}
                            textStyle={{ ...textStyle, lineHeight: lineHeight || 1 }}
                            inline
                        />
                    </span>
                </Button>
            </div>
        </div>
    );
}

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <CallToAction elRef={ref} {...props} />);
