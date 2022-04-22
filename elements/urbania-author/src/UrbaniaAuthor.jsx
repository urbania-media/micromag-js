/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Link from '@micromag/element-link';
import Text from '@micromag/element-text';
import Avatar from './Avatar';
import styles from './styles.module.scss';

const propTypes = {
    author: PropTypes.shape({
        slug: PropTypes.string,
        name: MicromagPropTypes.textElement,
        avatar: MicromagPropTypes.imageElement,
        url: PropTypes.string,
    }),
    withAvatar: PropTypes.bool,
    withoutLink: PropTypes.bool,
    isSmall: PropTypes.bool,
    linkUnderlineColor: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    author: null,
    withAvatar: true,
    withoutLink: false,
    isSmall: false,
    linkUnderlineColor: null,
    className: null,
};

const UrbaniaAuthor = ({
    author,
    withAvatar,
    withoutLink,
    isSmall,
    linkUnderlineColor,
    className,
}) => {
    const { name = null, avatar = null, url = null } = author || {};

    const prefix = (
        <span className={styles.by}>
            <FormattedMessage defaultMessage="By" description="Author label" />
        </span>
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSmall]: isSmall,
                    [styles.withoutAvatar]: !withAvatar || avatar === null,
                    [className]: className !== null,
                },
            ])}
        >
            <span className={styles.prefix}>{prefix}</span>
            {withAvatar && avatar !== null ? (
                <Avatar className={styles.avatar} image={avatar} />
            ) : null}
            {url !== null && !withoutLink ? (
                <Link
                    className={styles.link}
                    url={url}
                    external
                    style={{
                        backgroundImage:
                            linkUnderlineColor !== null
                                ? `linear-gradient(0deg, ${linkUnderlineColor} 0, ${linkUnderlineColor})`
                                : null,
                    }}
                >
                    <Text className={styles.name} {...name} />
                </Link>
            ) : (
                <div>
                    <Text className={styles.name} {...name} />
                </div>
            )}
        </div>
    );
};

UrbaniaAuthor.propTypes = propTypes;
UrbaniaAuthor.defaultProps = defaultProps;

export default UrbaniaAuthor;
