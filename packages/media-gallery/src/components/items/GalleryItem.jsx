/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faPlayCircle, faInfoCircle, faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Button } from '@micromag/core/components';

import { middleEllipsis } from '../../lib/utils';

import styles from '../../styles/items/gallery-item.module.scss';

const propTypes = {
    item: MicromagPropTypes.media,
    width: PropTypes.number,
    selected: PropTypes.bool,
    withInfoButton: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onClickInfo: PropTypes.func,
};

const defaultProps = {
    item: null,
    width: 0,
    selected: false,
    withInfoButton: false,
    className: null,
    onClick: null,
    onClickInfo: null,
};

const GalleryItem = ({
    item,
    width,
    selected,
    withInfoButton,
    className,
    onClick,
    onClickInfo,
}) => {
    const { type, thumbnail_url: thumbnail = null, name, size } = item;
    let title = name;
    if (width < 768) {
        title = middleEllipsis(name, Math.floor(Math.max(18, width / 2 / 9)));
    } else {
        title = middleEllipsis(name, Math.floor(Math.max(25, width / 3 / 8)));
    }
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
                            backgroundImage: thumbnail !== null ? `url('${thumbnail}')` : null,
                        }}
                    />
                    {type === 'video' ? (
                        <FontAwesomeIcon className={styles.icon} icon={faPlayCircle} />
                    ) : null}
                    {type === 'audio' ? (
                        <FontAwesomeIcon className={styles.icon} icon={faHeadphonesAlt} />
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
                    <small>{title}</small>
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
