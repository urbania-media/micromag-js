/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '../../lib';
import styles from '../../styles/partials/media.module.scss';
import Label from './Label';

const propTypes = {
    thumbnail: PropTypes.node,
    thumbnailAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
    children: PropTypes.node,
    title: MicromagPropTypes.label,
    className: PropTypes.string,
    thumbnailClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    titleClassName: PropTypes.string,
};

const defaultProps = {
    thumbnail: null,
    thumbnailAlign: 'top',
    children: null,
    title: null,
    className: null,
    thumbnailClassName: null,
    bodyClassName: null,
    titleClassName: null,
};

const Media = ({
    thumbnail,
    thumbnailAlign,
    children,
    title,
    className,
    thumbnailClassName,
    bodyClassName,
    titleClassName,
}) => (
    <div
        className={classNames([
            'card',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        {typeof thumbnail === 'string' ? (
            <img
                src={thumbnail}
                alt={title}
                className={classNames([
                    'me-3',
                    styles.thumbnail,
                    {
                        'align-self-start': thumbnailAlign === 'top',
                        'align-self-center': thumbnailAlign === 'center',
                        'align-self-end': thumbnailAlign === 'bottom',
                        [thumbnailClassName]: thumbnailClassName !== null,
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
                    {
                        [bodyClassName]: bodyClassName !== null,
                    },
                ])}
            >
                {title !== null ? (
                    <h5
                        className={classNames([
                            'mt-0',
                            'text-truncate',
                            styles.title,
                            {
                                [titleClassName]: titleClassName !== null,
                            },
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

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

export default Media;
