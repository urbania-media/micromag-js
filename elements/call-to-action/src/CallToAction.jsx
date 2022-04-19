/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, isIos, isValidUrl } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';
import WebView from '@micromag/element-webview';
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
    iconComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    arrowComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    screenSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    dragAmount: PropTypes.number,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    arrowClassName: PropTypes.string,
    focusable: PropTypes.bool,
};

const defaultProps = {
    elRef: null,
    disabled: false,
    animationDisabled: false,
    callToAction: null,
    iconComponent: null,
    arrowComponent: null,
    screenSize: null,
    dragAmount: 50,
    className: null,
    buttonClassName: null,
    labelClassName: null,
    arrowClassName: null,
    focusable: true,
};

function CallToAction({
    elRef,
    disabled,
    animationDisabled,
    callToAction,
    iconComponent: IconComponent,
    arrowComponent: ArrowComponent,
    screenSize,
    dragAmount,
    className,
    buttonClassName,
    labelClassName,
    arrowClassName,
    focusable,
}) {
    const {
        active = false,
        type = null,
        url = null,
        label = null,
        buttonStyle = null,
        inWebView = false,
    } = callToAction || {};

    const [showWebView, setShowWebView] = useState(false);
    const swipeUpEnabled = type === null || type === 'swipe-up';
    const validUrl = useMemo(() => isValidUrl(url), [url]);
    const buttonRef = useRef(null);

    const { textStyle: { fontSize = null, color = null } = {} } = label || {};
    const arrowStyle = useMemo(
        () => ({ ...{ fontSize }, ...getStyleFromColor(color, 'color') }),
        [fontSize, color],
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

    const onOpenWebView = useCallback(() => {
        setShowWebView(true);
    }, [setShowWebView]);

    const onCloseWebView = useCallback(() => {
        setShowWebView(false);
    }, [setShowWebView]);

    const ArrowElement =
        ArrowComponent !== null ? (
            <ArrowComponent
                className={classNames([
                    styles.arrow,
                    {
                        [arrowClassName]: arrowClassName !== null,
                    },
                ])}
            />
        ) : (
            <FontAwesomeIcon
                className={classNames([
                    styles.arrow,
                    {
                        [arrowClassName]: arrowClassName !== null,
                    },
                ])}
                style={arrowStyle}
                icon={faChevronUp}
            />
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
                        ...buttonStyle,
                    }}
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
                        {IconComponent !== null ? <IconComponent className={styles.icon} /> : null}
                        <Text {...label} inline />
                    </span>
                </Button>
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
