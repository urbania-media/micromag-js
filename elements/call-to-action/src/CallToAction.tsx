import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { BoxStyle, TextElement } from '@micromag/core';
import { useTrackEvent } from '@micromag/core/hooks';
import { getStyleFromColor, isIos, isValidUrl } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';

import ArrowIcon from './ArrowIcon';

import styles from './styles.module.css';

interface CallToActionProps {
    type?: 'click' | 'swipe-up' | null;
    url?: string | null;
    label?: TextElement | null;
    boxStyle?: BoxStyle | null;
    inWebView?: boolean;
    elRef?: ((...args: unknown[]) => void | { current?: unknown }) | null;
    disabled?: boolean;
    animationDisabled?: boolean;
    icon?: React.ReactNode | null;
    arrow?: React.ReactNode | null;
    dragAmount?: number;
    className?: string | null;
    buttonClassName?: string | null;
    buttonBorderClassName?: string | null;
    labelClassName?: string | null;
    arrowClassName?: string | null;
    focusable?: boolean;
    external?: boolean;
    openWebView?: ((...args: unknown[]) => void) | null;
    onClick?: ((...args: unknown[]) => void) | null;
}

function CallToAction({
    type = null,
    url = null,
    label = null,
    boxStyle = null,
    inWebView = false,
    elRef = null,
    disabled = false,
    animationDisabled = false,
    icon = null,
    arrow = null,
    dragAmount = 50,
    className = null,
    buttonClassName = null,
    buttonBorderClassName = null,
    labelClassName = null,
    arrowClassName = null,
    focusable = true,
    external = true,
    openWebView = null,
    onClick = null,
}: CallToActionProps) {
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

    const [toggled, setToggled] = useState(false);

    // On click
    const onClickLink = useCallback(
        (e, action = 'click') => {
            setToggled(!toggled);
            if (inWebView && openWebView !== null) {
                openWebView({
                    url,
                });
            }
            if (onClick !== null && action === 'click') {
                onClick(e);
            }
            if (trackEvent !== null) {
                trackEvent('call_to_action', isString(action) ? action : 'click', url);
            }
        },
        [toggled, url, onClick, trackEvent, inWebView, openWebView],
    );

    const onDrag = useCallback(({ event }) => {
        // fix firefox https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
        event.preventDefault();
    }, []);

    const onDragEnd = useCallback(
        ({ movement: [, my] }) => {
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
        },
        [dragAmount, inWebView, onClickLink, setLeaving],
    );

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
                className,
                {
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
                <div className={classNames([styles.arrow, arrowClassName])} style={arrowStyle}>
                    {arrow || <ArrowIcon />}
                </div>
            ) : null}
            <div className={classNames([styles.buttonBorder, buttonBorderClassName])}>
                <Button
                    className={classNames([
                        styles.button,
                        buttonClassName,
                        {
                            [styles.withoutLinkStyle]: !inWebView,
                        },
                    ])}
                    ref={buttonRef}
                    focusable={focusable}
                    buttonStyle={boxStyle}
                    inline
                    aria-pressed={toggled}
                    href={!inWebView ? url : null}
                    external={!inWebView ? external : false}
                    onClick={onClickLink}
                    {...(swipeUpEnabled && !disabled ? bind() : null)}
                >
                    <span className={classNames([styles.label, labelClassName])}>
                        {icon !== null ? <div className={styles.icon}>{icon}</div> : null}
                        <Text
                            {...label}
                            className={styles.text}
                            textStyle={{ ...textStyle, lineHeight: lineHeight || 1 }}
                            inline
                        />
                    </span>
                </Button>
            </div>
        </div>
    );
}

export default ({ ref, ...props }) => <CallToAction elRef={ref} {...props} />;
