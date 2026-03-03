/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { HeadingElement, Message, TextElement } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';

import styles from './sign-card.module.css';

interface SignCardProps {
    className?: string;
    sign?: {
        id?: string;
        label?: TextElement;
        date?: Message;
        thumbnail?: string;
        word?: HeadingElement;
        description?: TextElement;
    };
    focusable?: boolean;
    onClick?: (...args: unknown[]) => void;
}

function SignCard({ className = null, sign = null, focusable = true, onClick = null }) {
    const { id = null, thumbnail = null, label = null, date = null } = sign || {};

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
                tabIndex={focusable ? '0' : -1}
                onClick={onClick}
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
}

export default SignCard;
