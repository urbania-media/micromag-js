/* eslint-disable react/jsx-props-no-spreading */
import { useSpring, useSprings } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useLongPress, useYeah } from '@micromag/core/hooks';
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

    const bindLongPress = useLongPress({
        onLongPressStart,
        onLongPress,
        onLongPressEnd,
        delay: 500,
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
            <Button className={styles.container} {...bindLongPress(id)}>
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
            </Button>
        </ScreenElement>
    );
};

SignCard.propTypes = propTypes;
SignCard.defaultProps = defaultProps;

export default SignCard;
