/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons/faHeadphonesAlt';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Card } from '@micromag/core/components';

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
    onClickRemove: PropTypes.func,
};

const defaultProps = {
    item: null,
    width: 0,
    selected: false,
    withInfoButton: false,
    className: null,
    onClick: null,
    onClickInfo: null,
    onClickRemove: null,
};

const GalleryItem = ({
    item,
    width,
    selected,
    withInfoButton,
    className,
    onClick,
    onClickInfo,
    onClickRemove,
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
                    className={classNames([
                        'd-block',
                        'position-relative',
                        'p-0',
                        'border-0',
                        'w-100',
                        'text-start',
                        'bg-dark',
                        'text-black',
                        styles.imageButton,
                    ])}
                    type="button"
                    onClick={onClick}
                >
                    <div
                        className={classNames(['card-img-top', styles.image])}
                        style={{
                            backgroundImage: thumbnail !== null ? `url('${thumbnail}')` : null,
                        }}
                    />
                </button>
            }
            beforeBody={
                <>
                    {withInfoButton ? (
                        <Button className={styles.infoButton} onClick={onClickInfo} withoutStyle>
                            <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                        </Button>
                    ) : null}
                    {selected ? (
                        <Button
                            className={classNames(['text-danger', styles.closeButton])}
                            onClick={onClickRemove}
                            withoutStyle
                        >
                            <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
                        </Button>
                    ) : null}
                </>
            }
            footer={
                <>
                    {type === 'video' ? (
                        <FontAwesomeIcon className={styles.icon} icon={faPlayCircle} />
                    ) : null}
                    {type === 'audio' ? (
                        <FontAwesomeIcon className={styles.icon} icon={faHeadphonesAlt} />
                    ) : null}
                    <div className={classNames(['text-truncate', styles.label])}>
                        <small>{title}</small>
                        {size !== null ? <small className="text-body-secondary ms-1">{size}</small> : null}
                    </div>
                </>
            }
            theme={selected ? null : null}
            className={classNames([
                styles.container,
                {
                    // 'border-primary': selected,
                    [styles.selected]: selected,
                    [className]: className !== null,
                },
            ])}
            footerClassName={classNames(['p-1', styles.footer])}
            onClickFooter={onClick}
        />
    );
};

GalleryItem.propTypes = propTypes;
GalleryItem.defaultProps = defaultProps;

export default GalleryItem;
