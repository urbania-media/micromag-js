/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Button } from '@micromag/core/components';

import styles from '../../styles/items/gallery-item.module.scss';

const propTypes = {
    item: MicromagPropTypes.media,
    selected: PropTypes.bool,
    withInfoButton: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onClickInfo: PropTypes.func,
};

const defaultProps = {
    item: null,
    selected: false,
    withInfoButton: false,
    className: null,
    onClick: null,
    onClickInfo: null,
};

const GalleryItem = ({ item, selected, withInfoButton, className, onClick, onClickInfo }) => {
    const { type, thumbnail_url: thumbnail = null, name, size } = item;
    return (
        <Card
            image={
                <button
                    type="button"
                    className={classNames(['p-0', styles.imageButton])}
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
            beforeBody={
                withInfoButton ? (
                    <Button className={styles.infoButton} onClick={onClickInfo} withoutStyle>
                        <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                    </Button>
                ) : null
            }
            footer={
                <>
                    <small>{name}</small>
                    <small className="text-muted">{size}</small>
                </>
            }
            theme={selected ? 'primary' : null}
            className={classNames([
                styles.container,
                {
                    'border-primary': selected,
                    [className]: className !== null,
                },
            ])}
            footerClassName={classNames(['p-2', styles.footer])}
            onClickFooter={onClick}
        />
    );
};

GalleryItem.propTypes = propTypes;
GalleryItem.defaultProps = defaultProps;

export default GalleryItem;
