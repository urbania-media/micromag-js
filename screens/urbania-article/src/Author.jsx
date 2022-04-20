import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Avatar from './Avatar';
import styles from './author.module.scss';

const propTypes = {
    author: PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        avatar: MicromagPropTypes.imageElement,
        url: PropTypes.string,
    }),
    withAvatar: PropTypes.bool,
    withConjunction: PropTypes.bool,
    withoutLink: PropTypes.bool,
    isSmall: PropTypes.bool,
    linkUnderlineColor: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    author: null,
    withAvatar: true,
    withConjunction: false,
    withoutLink: false,
    isSmall: false,
    linkUnderlineColor: null,
    className: null,
};

const Author = ({
    author,
    withAvatar,
    withConjunction,
    withoutLink,
    isSmall,
    linkUnderlineColor,
    className,
}) => {
    const { slug = '', name = '', avatar = null, url = null } = author || {};
    let prefix = (
        <span className={styles.by}>
            <FormattedMessage defaultMessage="Par" description="Author" />
        </span>
    );
    if (withConjunction) {
        prefix = (
            <span className={styles.conjunction}>
                <FormattedMessage defaultMessage="et" description="Author" />
            </span>
        );
    }
    return (
        <div
            className={classNames([
                styles.container,

                { [styles.isSmall]: isSmall, [className]: className !== null },
            ])}
        >
            <span className={styles.prefix}>{prefix}</span>
            {withAvatar && avatar !== null ? (
                <Avatar className={styles.avatar} image={avatar} />
            ) : null}
            {url !== null && !withoutLink ? (
                <div
                    className={styles.name}
                    style={{
                        backgroundImage:
                            linkUnderlineColor !== null
                                ? `linear-gradient(0deg, ${linkUnderlineColor} 0, ${linkUnderlineColor})`
                                : null,
                    }}
                >
                    {name}
                </div>
            ) : (
                <em className={styles.name}>{name}</em>
            )}
        </div>
    );
};

Author.propTypes = propTypes;
Author.defaultProps = defaultProps;

export default Author;
