/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isTextFilled } from '@micromag/core/utils';
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
    withoutPrefix: PropTypes.bool,
    isSmall: PropTypes.bool,
    linkUnderlineColor: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    author: null,
    withAvatar: true,
    withoutLink: false,
    withoutPrefix: false,
    isSmall: false,
    linkUnderlineColor: null,
    className: null,
};

const UrbaniaAuthor = ({
    author,
    withAvatar,
    withoutLink,
    withoutPrefix,
    isSmall,
    linkUnderlineColor,
    className,
}) => {
    const intl = useIntl();
    const { name = null, avatar = null, url = null } = author || {};

    const prefix = intl.formatMessage({
        defaultMessage: 'By',
        description: 'Author label',
    });

    const text = isTextFilled(name) ? <Text className={styles.name} {...name} /> : null;

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
            {!withoutPrefix ? <Text {...name} className={styles.prefix} body={prefix} /> : null}
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
                    {text}
                </Link>
            ) : (
                <div>{text}</div>
            )}
        </div>
    );
};

UrbaniaAuthor.propTypes = propTypes;
UrbaniaAuthor.defaultProps = defaultProps;

export default UrbaniaAuthor;
