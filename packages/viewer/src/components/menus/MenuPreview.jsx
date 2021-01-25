/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview, Button } from '@micromag/core/components';
import Scroll from '@micromag/element-scroll';

import ShareStoryModal from '../modals/ShareStory';

import styles from '../../styles/menus/menu-preview.module.scss';


const propTypes = {
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    title: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    onShare: PropTypes.func,
    thumbsPerLine: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    screenWidth: null,
    screenHeight: null,
    title: null,
    items: [],
    current: 0,
    onClickItem: null,
    onClose: null,
    onShare: null,
    thumbsPerLine: 4,
    className: null,
};

const ViewerMenuPreview = ({
    screenWidth,
    screenHeight,
    title,
    items,
    current,
    onClickItem,
    onClose,
    onShare,
    thumbsPerLine,
    className,
}) => {
    const screenSizeRatio = `${(screenHeight / screenWidth / thumbsPerLine) * 100}%`;

    const [thumbSize, setThumbSize] = useState(null);
    const firstScreenContainerRef = useRef(null);

    useEffect(() => {
        if (firstScreenContainerRef.current !== null) {
            const { offsetWidth, offsetHeight } = firstScreenContainerRef.current;
            setThumbSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [screenWidth, screenHeight]);

    // Share
    const hasWindow = typeof window !== 'undefined';
    const shareUrl = hasWindow ? window.location.href : null;

    const [storyShareModalOpened, setStoryShareModalOpened] = useState(false);
    const onShareIconClick = useCallback( () => {
        setStoryShareModalOpened(true);
    }, [setStoryShareModalOpened]);
    const onStoryShared = useCallback((type) => {
        setStoryShareModalOpened(false);
        if (onShare !== null) {
            onShare(type);
        }
    }, [setStoryShareModalOpened, onShare]);
    const onStoryShareCanceled = useCallback( () => {
        setStoryShareModalOpened(false);
    }, [setStoryShareModalOpened]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ width: screenWidth, height: screenHeight }}
        >
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <Button className={styles.button} onClick={onShareIconClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faShare} />
                </Button>
                <Button className={styles.button} onClick={onClose}>
                    <FontAwesomeIcon className={styles.icon} icon={faTimes} />
                </Button>
            </div>
            <div className={styles.content}>
                <Scroll className={styles.scroll}>
                    <nav className={styles.nav}>
                        <ul className={styles.items}>
                            {items.map((item, index) => (
                                <li
                                    className={classNames([
                                        styles.item,
                                        {
                                            [styles.active]: current === index,
                                        },
                                    ])}
                                    key={`item-${index}`}
                                    style={{
                                        paddingBottom: screenSizeRatio,
                                        width: `${100 / thumbsPerLine}%`,
                                    }}
                                >
                                    <div className={styles.itemContent}>
                                        <div
                                            className={styles.screenContainer}
                                            ref={index === 0 ? firstScreenContainerRef : null}
                                        >
                                            <div
                                                className={styles.screenContent}
                                                style={
                                                    thumbSize !== null
                                                        ? {
                                                            width: screenWidth,
                                                            height: screenHeight,
                                                            transform: `scale(${
                                                                thumbSize.width / screenWidth
                                                            }, ${thumbSize.height / screenHeight})`,
                                                        }
                                                        : null
                                                }
                                            >
                                                <ScreenPreview
                                                    width={screenWidth}
                                                    height={screenHeight}
                                                    screen={item}
                                                />
                                            </div>
                                            {current === index ? (
                                                <div className={styles.activeScreenBorder} />
                                            ) : null}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.screenButton}
                                        onClick={ () => { onClickItem(index) } }
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Scroll>
            </div>
            { storyShareModalOpened ? (
                <ShareStoryModal
                    title={title}
                    url={shareUrl}
                    onShare={onStoryShared}
                    onCancel={onStoryShareCanceled}
                />
            ) : null}
        </div>
    );
};

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;
