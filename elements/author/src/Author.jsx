/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
        image: MicromagPropTypes.imageElement,
        url: PropTypes.string,
        collaborator: MicromagPropTypes.textElement,
    }),
    withImage: PropTypes.bool,
    withoutLink: PropTypes.bool,
    isSmall: PropTypes.bool,
    linkUnderlineColor: PropTypes.string,
    className: PropTypes.string,
    backgroundClassName: PropTypes.string,
    collaboratorClassName: PropTypes.string,
    shouldLoad: PropTypes.bool,
};

const defaultProps = {
    author: null,
    withImage: true,
    withoutLink: false,
    isSmall: false,
    linkUnderlineColor: null,
    className: null,
    backgroundClassName: null,
    collaboratorClassName: null,
    shouldLoad: true,
};

const Author = ({
    author,
    withImage,
    withoutLink,
    isSmall,
    linkUnderlineColor,
    className,
    backgroundClassName,
    collaboratorClassName,
    shouldLoad,
    ...otherProps
}) => {
    const { name = null, image = null, url = null, collaborator = null } = author || {};
    const withAvatar = withImage && image !== null;

    const authorText = isTextFilled(name) ? (
        <Text
            className={classNames([
                styles.name,
                {
                    [backgroundClassName]: backgroundClassName,
                },
            ])}
            {...name}
        />
    ) : null;
    const collaboratorText = isTextFilled(collaborator) ? (
        <Text className={styles.collaboratorText} {...collaborator} inline />
    ) : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSmall]: isSmall,
                    [styles.withoutAvatar]: withAvatar,
                    [styles.withoutImage]: !withImage || image === null,
                    [className]: className !== null,
                },
            ])}
            {...otherProps}
        >
            {withAvatar ? (
                <Avatar className={styles.image} image={image} shouldLoad={shouldLoad} />
            ) : null}
            <div className={styles.right}>
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
                        {authorText}
                    </Link>
                ) : (
                    <div>{authorText}</div>
                )}
                {collaboratorText !== null ? (
                    <div
                        className={classNames([
                            styles.collaborator,
                            {
                                [collaboratorClassName]: collaboratorClassName,
                            },
                        ])}
                    >
                        {collaboratorText !== null ? collaboratorText : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

Author.propTypes = propTypes;
Author.defaultProps = defaultProps;

export default Author;
