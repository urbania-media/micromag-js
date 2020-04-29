/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/items/gallery-item.module.scss';

const propTypes = {
    withInfoButton: PropTypes.bool,
    item: AppPropTypes.media,
    onClick: PropTypes.func,
    onClickInfo: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    withInfoButton: false,
    item: null,
    onClick: null,
    onClickInfo: null,
    className: null,
};

const GalleryItem = ({ withInfoButton, item, onClick, onClickInfo, className }) => {
    const { type, thumbnail_url: thumbnail = null, name, size } = item;
    return (
        <Card
            image={
                <button
                    type="button"
                    className={classNames(['p-0', 'bg-dark', styles.imageButton])}
                    onClick={onClick}
                >
                    <div
                        className={classNames(['card-img-top', styles.image])}
                        style={{
                            backgroundImage: thumbnail !== null ? `url("${thumbnail}")` : null,
                        }}
                    />
                    {type === 'video' ? (
                        <FontAwesomeIcon className={styles.playIcon} icon={faPlayCircle} />
                    ) : null}
                </button>
            }
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            bodyClassName={styles.body}
            beforeBody={
                withInfoButton ? (
                    <Button className={styles.infoButton} onClick={onClickInfo} withoutStyle>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Button>
                ) : null
            }
            onClickBody={onClick}
        >
            <p className="m-0">
                <strong>{name}</strong>
                <br />
                <small>{size}</small>
            </p>
        </Card>
    );
};

GalleryItem.propTypes = propTypes;
GalleryItem.defaultProps = defaultProps;

export default GalleryItem;
