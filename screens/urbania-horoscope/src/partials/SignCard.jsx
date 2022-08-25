/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';

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
    onClick: PropTypes.func
};

const defaultProps = {
    className: null,
    sign: null,
    onClick: null,
};

const SignCard = ({
    className,
    sign,
    onClick
}) => {
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
};

SignCard.propTypes = propTypes;
SignCard.defaultProps = defaultProps;

export default SignCard;
