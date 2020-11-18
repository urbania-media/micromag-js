/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';

import styles from '../../styles/menus/menu-preview.module.scss';

const propTypes = {
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    title: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    screenWidth: null,
    screenHeight: null,
    title: 'Titre du micromag',
    items: [],
    current: 0,
    onClickItem: null,
    onClose: null,
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
    className,
}) => {
    // console.log(screenWidth, screenHeight, screenWidth / screenHeight, screenHeight / screenWidth);
    // const screenSizeRatio = `${100 - (screenWidth / screenHeight) * 100}%`;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <button type="button" className={styles.share}>
                    Share
                </button>
                <button type="button" className={styles.close} onClick={onClose}>
                    Close
                </button>
            </div>
            <div className={styles.content}>
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
                                style={{ paddingBottom: '40%' }}
                            >
                                <div
                                    className={styles.screenContainer}
                                    style={{
                                        width: screenWidth,
                                        height: screenHeight,
                                    }}
                                >
                                    <ScreenPreview
                                        width={screenWidth}
                                        height={screenHeight}
                                        screen={item}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={styles.button}
                                    onClick={() =>
                                        onClickItem !== null ? onClickItem(index) : null
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

ViewerMenuPreview.propTypes = propTypes;
ViewerMenuPreview.defaultProps = defaultProps;

export default ViewerMenuPreview;
