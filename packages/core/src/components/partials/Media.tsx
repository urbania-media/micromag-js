/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Label from './Label';

import styles from '../../styles/partials/media.module.css';

interface MediaProps {
    thumbnail?: React.ReactNode | null;
    thumbnailAlign?: 'top' | 'center' | 'bottom';
    children?: React.ReactNode | null;
    title?: Label | null;
    className?: string | null;
    thumbnailClassName?: string | null;
    bodyClassName?: string | null;
    titleClassName?: string | null;
}

function Media({
    thumbnail = null,
    thumbnailAlign = 'top',
    children = null,
    title = null,
    className = null,
    thumbnailClassName = null,
    bodyClassName = null,
    titleClassName = null,
}: MediaProps) {
    return (
        <div
            className={classNames([
                'card',
                styles.container,
                className,
            ])}
        >
            {typeof thumbnail === 'string' ? (
                <img
                    src={thumbnail}
                    alt={title}
                    className={classNames([
                        'me-3',
                        styles.thumbnail,
                        thumbnailClassName,
                        {
                            'align-self-start': thumbnailAlign === 'top',
                            'align-self-center': thumbnailAlign === 'center',
                            'align-self-end': thumbnailAlign === 'bottom',
                        },
                    ])}
                />
            ) : (
                thumbnail
            )}
            {title !== null || children !== null ? (
                <div
                    className={classNames([
                        'card-body',
                        styles.body,
                        bodyClassName,
                    ])}
                >
                    {title !== null ? (
                        <h5
                            className={classNames([
                                'mt-0',
                                'text-truncate',
                                styles.title,
                                titleClassName,
                            ])}
                        >
                            <Label>{title}</Label>
                        </h5>
                    ) : null}
                    {children}
                </div>
            ) : null}
        </div>
    );
}

export default Media;
