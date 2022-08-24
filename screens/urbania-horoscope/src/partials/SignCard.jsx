/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useProgressTransition, useLongPress } from '@micromag/core/hooks';

import styles from './sign-card.module.scss';

const propTypes = {
    className: PropTypes.string,
    sign: PropTypes.shape({
        id: PropTypes.string,
        label: MicromagPropTypes.textElement,
        date: MicromagPropTypes.message,
        thumbnail: PropTypes.string,
        word: MicromagPropTypes.headingElement,
        description: MicromagPropTypes.textElement,
    }),
    onLongPress: PropTypes.func,
    onLongPressStart: PropTypes.func,
    onLongPressEnd: PropTypes.func,
    longPressDelay: PropTypes.number,
};

const defaultProps = {
    className: null,
    sign: null,
    onLongPress: null,
    onLongPressStart: null,
    onLongPressEnd: null,
    longPressDelay: 500,
};

const SignCard = ({
    className,
    sign,
    onLongPress,
    onLongPressStart,
    onLongPressEnd,
    longPressDelay,
}) => {
    const { id = null, thumbnail = null, label = null, date = null } = sign || {};

    const { bind, pressed } = useLongPress({
        onLongPress,
        onLongPressStart,
        onLongPressEnd,
        preventClick: true,
        delay: longPressDelay,
    });

    const { styles: buttonStyles = {} } = useProgressTransition({
        value: pressed,
        fn: (p) => ({
            transform: `scale(${1 + 0.15 * p * p * p * p})`, // quad damage
            boxShadow: `0 0 ${1 * p}rem ${-0.25 * p}rem black`,
            zIndex: p > 0 ? 2 : 1,
        }),
        config: {
            config: {
                duration: longPressDelay,
            }
        },
    });

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
                className={classNames([styles.container, { [className]: className !== null }])}
                type="button"
                style={buttonStyles}
                {...bind(id)}
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
