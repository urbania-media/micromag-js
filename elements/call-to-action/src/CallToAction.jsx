/* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromBox, getStyleFromColor, isIos, isValidUrl } from '@micromag/core/utils';
// import { Button } from '@micromag/core/components';
import Button from '@micromag/element-button';
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
    focusable: PropTypes.bool,
};

const defaultProps = {
    elRef: null,
    disabled: false,
    animationDisabled: false,
    callToAction: null,
    dragAmount: 50,
    className: null,
    focusable: true,
};

function CallToAction({
    elRef,
    disabled,
    animationDisabled,
    callToAction,
    dragAmount,
    className,
    focusable,
}) {
    const {
        active = false,
        type = null,
        url = null,
        label = null,
        buttonStyle = null,
    } = callToAction || {};

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
                if (isIos()) {
                    selfTargetLinkRef.current.click();
                    setLeaving(true);
                } else {
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

    // console.log(callToAction, buttonStyle);

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
            {leaving ? <div className={styles.leavingFrame} /> : null}
            <a
                className={styles.selfTargetLink}
                href={url}
                ref={selfTargetLinkRef}
                tabIndex={focusable ? '0' : '-1'}
            />
            {swipeUpEnabled ? (
                <FontAwesomeIcon className={styles.arrow} style={arrowStyle} icon={faChevronUp} />
            ) : null}
            <Button
                href={url}
                external
                className={styles.button}
                // withoutStyle
                refButton={buttonRef}
                focusable={focusable}
                buttonStyle={{
                    marginBottom: 10,
                    ...getStyleFromBox(buttonStyle),
                }}
                {...(swipeUpEnabled && !disabled ? bind() : null)}
            >
                <span className={styles.label}>
                    <Text {...label} inline />
                </span>
            </Button>
        </div>
    ) : null;
}

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <CallToAction elRef={ref} {...props} />);
