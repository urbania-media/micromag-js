/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useTransitionStyles, useLongPress } from '@micromag/core/hooks';
import Button from '@micromag/element-button';

// import Close from './icons/Close';
import styles from './sign-card.module.scss';

const propTypes = {
    sign: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        date: MicromagPropTypes.message,
        thumbnail: PropTypes.string,
        word: MicromagPropTypes.headingElement,
        description: MicromagPropTypes.textElement,
    }),
    // className: PropTypes.string,
    onLongPress: PropTypes.func,
    onLongPressStart: PropTypes.func,
    onLongPressEnd: PropTypes.func,
};

const defaultProps = {
    sign: null,
    // className: null,
    onLongPress: null,
    onLongPressStart: null,
    onLongPressEnd: null,
};

const SignCard = ({ sign, onLongPress, onLongPressStart, onLongPressEnd }) => {
    const { id = null, thumbnail = null, label = null, date = null } = sign || {};
    const [pressed, setPressed] = useState(0);

    const onSignLongPressStart = useCallback( (e, extras) => {
        setPressed(1);
        if (onLongPress !== null) {
            onLongPressStart(e, extras);
        }
    }, [setPressed])

    const onSignLongPressEnd = useCallback( (e, extras) => {
        setPressed(0);
        if (onLongPress !== null) {
            onLongPressEnd(e, extras);
        }
    }, [setPressed]);

    const bindLongPress = useLongPress({
        onLongPress,
        onLongPressStart: onSignLongPressStart,
        onLongPressEnd: onSignLongPressEnd,
        shouldPreventDefault: false,
        delay: 200,
    });

    const ease = x => 1 - (1 - x) * (1 - x);
    const buttonStyles = useTransitionStyles(
        pressed,
        (p) => ({
            transform: `scale(${1 + 0.15 * ease(p)})`,
            boxShadow: `0 0 ${1 * p}rem ${-0.25 * p}rem black`,
        }),
        {
            config: {
                duration: 200,
            },
        },
    );

    return (
        <ScreenElement
            placeholder={<PlaceholderTitle className={styles.placeholder} />}
            emptyLabel={
                <FormattedMessage defaultMessage="Horoscope sign" description="Sign placeholder" />
            }
            emptyClassName={styles.emptyText}
            isEmpty={!id}
        >
            <button
                className={styles.container}
                type="button"
                style={buttonStyles}
                {...bindLongPress(id)}
            >
                {thumbnail !== null ? (
                    <img className={styles.thumbnail} src={thumbnail} alt={id} loading="lazy" />
                ) : null}
                <div className={styles.gridText}>
                    <h2 className={styles.name}>
                        {label !== null ? <FormattedMessage {...label} /> : null}
                    </h2>
                    <p className={styles.date}>
                        {date !== null ? <FormattedMessage {...date} /> : null}
                    </p>
                </div>
            </button>
        </ScreenElement>
    );
};

SignCard.propTypes = propTypes;
SignCard.defaultProps = defaultProps;

export default SignCard;
