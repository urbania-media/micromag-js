/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { ImageElement, TextElement } from '@micromag/core';
import { isTextFilled } from '@micromag/core/utils';
import Link from '@micromag/element-link';
import Text from '@micromag/element-text';

import Avatar from './Avatar';

import styles from './styles.module.css';

interface AuthorProps {
    author?: {
        slug?: string;
        name?: TextElement;
        image?: ImageElement;
        url?: string;
        collaborator?: TextElement;
    };
    withImage?: boolean;
    withoutLink?: boolean;
    linkUnderlineColor?: string;
    className?: string;
    backgroundClassName?: string;
    collaboratorClassName?: string;
    shouldLoad?: boolean;
}

function Author({
    author = null,
    withImage = true,
    withoutLink = false,
    linkUnderlineColor = null,
    className = null,
    backgroundClassName = null,
    collaboratorClassName = null,
    shouldLoad = true,
    ...otherProps
}) {
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
}

export default Author;
