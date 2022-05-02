/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, isIos, isValidUrl } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';
import WebView from '@micromag/element-webview';
import ArrowIcon from './ArrowIcon';
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
    icon: PropTypes.node,
    arrow: PropTypes.node,
    screenSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    dragAmount: PropTypes.number,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonBorderClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    arrowClassName: PropTypes.string,
    focusable: PropTypes.bool,
};

const defaultProps = {
    elRef: null,
    disabled: false,
    animationDisabled: false,
    callToAction: null,
    icon: null,
    arrow: null,
    screenSize: null,
    dragAmount: 50,
    className: null,
    buttonClassName: null,
    buttonBorderClassName: null,
    labelClassName: null,
    arrowClassName: null,
    focusable: true,
};

function CallToAction({
    elRef,
    disabled,
    animationDisabled,
    callToAction,
    icon,
    arrow,
    screenSize,
    dragAmount,
    className,
    buttonClassName,
    buttonBorderClassName,
    labelClassName,
    arrowClassName,
    focusable,
}) {
    const {
        active = false,
        type = null,
        url = null,
        label = null,
        boxStyle = null,
        inWebView = false,
    } = callToAction || {};

    const [showWebView, setShowWebView] = useState(false);
    const [disableWebView, setDisabledWebView] = useState(true);

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

    const bind = useGesture({
        onDrag: ({ event }) => {
            // fix firefox https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
            event.preventDefault();
        },
        onDragEnd: ({ movement: [, my] }) => {
            if (my < -dragAmount) {
                if (inWebView) {
                    setShowWebView(true);
                    setDisabledWebView(false);
                } else if (isIos()) {
                    selfTargetLinkRef.current.click();
                    setLeaving(true);
                } else if (buttonRef.current) {
                    buttonRef.current.click();
                }
            }
        },
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

    useEffect(() => {
        let id = null;
        if (inWebView) {
            if (showWebView) {
                setDisabledWebView(false);
            } else {
                id = setTimeout(() => {
                    setDisabledWebView(true);
                }, 300);
            }
        }
        return () => {
            clearTimeout(id);
        };
    }, [showWebView, setDisabledWebView]);

    const onOpenWebView = useCallback(() => {
        setShowWebView(true);
        setDisabledWebView(false);
    }, [setShowWebView, setDisabledWebView]);

    const onCloseWebView = useCallback(() => {
        setShowWebView(false);
    }, [setShowWebView]);

    const ArrowElement =
        arrow !== null ? (
            <div
                className={classNames([
                    styles.arrow,
                    {
                        [arrowClassName]: arrowClassName !== null,
                    },
                ])}
                style={arrowStyle}
            >
                {arrow}
            </div>
        ) : (
            <div
                className={classNames([
                    styles.arrow,
                    {
                        [arrowClassName]: arrowClassName !== null,
                    },
                ])}
                style={arrowStyle}
            >
                <ArrowIcon />
            </div>
        );

    return active ? (
        <>
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
                <a
                    className={styles.selfTargetLink}
                    href={url}
                    ref={selfTargetLinkRef}
                    tabIndex={focusable ? '0' : '-1'}
                />
                {swipeUpEnabled ? ArrowElement : null}
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
                        buttonStyle={{
                            marginBottom: 10,
                            ...boxStyle,
                        }}
                        inline
                        {...(swipeUpEnabled && !disabled ? bind() : null)}
                        {...(inWebView
                            ? { onClick: onOpenWebView }
                            : {
                                  href: url,
                                  external: true,
                              })}
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
            {inWebView ? (
                <WebView
                    className={classNames([
                        styles.webView,
                        {
                            [styles.visible]: showWebView,
                        },
                    ])}
                    src={url}
                    disabled={!showWebView}
                    closeable
                    hidden={disableWebView}
                    onClose={onCloseWebView}
                    {...screenSize}
                />
            ) : null}
        </>
    ) : null;
}

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <CallToAction elRef={ref} {...props} />);
