/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessage, useIntl } from 'react-intl';
import { useGesture } from 'react-use-gesture';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
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

const CallToAction = ({
    elRef,
    disabled,
    animationDisabled,
    callToAction,
    dragAmount,
    className,
}) => {
    const intl = useIntl();
    const { active = false, type = null, url = null, label = null } = callToAction || {};

    const swipeUpEnabled = type === null || type === 'swipe-up';

    const buttonRef = useRef(null);

    const defaultLabel = intl.formatMessage(
        defineMessage({
            defaultMessage: 'Learn more',
            description: 'Call to action default label',
        }),
    );
    const finalLabelProps = { ...{ body: defaultLabel }, ...label };
    const { textStyle: { fontSize = null } = {} } = finalLabelProps || {};

    const bind = useGesture({
        // fix firefox https://use-gesture.netlify.app/docs/faq/#why-cant-i-properly-drag-an-image-or-a-link
        onDrag: ({ event }) => {
            event.preventDefault();
        },
        onDragEnd: ({ movement: [, my] }) => {
            if (my < -dragAmount) {
                buttonRef.current.click();
            }
        },
    });

    return active ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.disabled]: disabled,
                    [styles.animationDisabled]: animationDisabled,
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
                        style={{ fontSize }}
                        icon={faChevronUp}
                    />
                ) : null}
                <span className={styles.label}>
                    <Text {...finalLabelProps} inline />
                </span>
            </Button>
        </div>
    ) : null;
};

CallToAction.propTypes = propTypes;
CallToAction.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <CallToAction elRef={ref} {...props} />);
