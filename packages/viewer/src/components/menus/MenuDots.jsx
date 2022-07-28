/* eslint-disable react/no-array-index-key */
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ShareButton from '../partials/ShareButton';
import MenuDot from './MenuDot';
import MenuIcon from './MenuIcon';

import styles from '../../styles/menus/menu-dots.module.scss';

const propTypes = {
    currentScreenIndex: PropTypes.number,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    withShadow: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    shareUrl: PropTypes.string,
    onShare: PropTypes.func,
    onClickItem: PropTypes.func,
    onClickMenu: PropTypes.func,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    closeable: PropTypes.bool,
    withItemClick: PropTypes.bool,
    withoutScreensMenu: PropTypes.bool,
    withoutShareMenu: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    currentScreenIndex: 0,
    direction: 'horizontal',
    withShadow: false,
    title: null,
    description: null,
    items: [],
    shareUrl: null,
    onShare: null,
    onClickItem: null,
    onClickMenu: null,
    colors: null,
    closeable: false,
    withItemClick: false,
    withoutScreensMenu: false,
    withoutShareMenu: false,
    onClose: null,
    className: null,
};

const ViewerMenuDots = ({
    currentScreenIndex,
    direction,
    withShadow,
    title,
    description,
    items,
    shareUrl,
    onShare,
    onClickItem,
    onClickMenu,
    colors,
    closeable,
    withItemClick,
    withoutScreensMenu,
    withoutShareMenu,
    onClose,
    className,
}) => {
    const { primary = 'rgba(255, 255, 255, 1)' } = colors || {};
    const intl = useIntl();
    const currentIndex = items.findIndex(({ current = false }) => current);

    return (
        <nav
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.vertical]: direction === 'vertical',
                    [styles.withShadow]: withShadow,
                },
            ])}
            aria-label={intl.formatMessage(
                {
                    defaultMessage: 'You are on screen {current} of {total}.',
                    description: 'Nav ARIA label',
                },
                {
                    current: currentIndex + 1,
                    total: items.length,
                },
            )}
        >
            <ul className={styles.items}>
                {items.map((item, index) => {
                    const { current = false, count = 1, subIndex = 0 } = item || {};
                    return (
                        <MenuDot
                            key={`item-${index + 1}`}
                            current={current}
                            active={index <= currentIndex}
                            colors={colors}
                            count={count}
                            subIndex={subIndex}
                            onClick={() => {
                                if ((withItemClick || withoutScreensMenu) && onClickItem !== null) {
                                    onClickItem(item);
                                } else if (!withItemClick && onClickMenu !== null) {
                                    onClickMenu();
                                }
                            }}
                            vertical={direction === 'vertical'}
                        />
                    );
                })}

                {!withoutShareMenu ? (
                    <li className={styles.menu}>
                        <ShareButton
                            className={styles.shareButton}
                            buttonClassName={styles.menuButton}
                            title={title}
                            description={description}
                            url={shareUrl}
                            items={items}
                            currentScreenIndex={currentScreenIndex}
                            onShare={onShare}
                        >
                            <FontAwesomeIcon className={styles.icon} icon={faShare} />
                        </ShareButton>
                    </li>
                ) : null}

                {!withoutScreensMenu ? (
                    <li className={styles.menu}>
                        <MenuIcon className={styles.menuIcon} color={primary} />
                        <button
                            type="button"
                            title={intl.formatMessage({
                                defaultMessage: 'Menu',
                                description: 'Button label',
                            })}
                            aria-label={intl.formatMessage({
                                defaultMessage: 'Menu',
                                description: 'Button label',
                            })}
                            className={styles.menuButton}
                            onClick={onClickMenu}
                        />
                    </li>
                ) : null}
                {closeable ? (
                    <li className={styles.closeButton} style={{ color: primary }}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            title={intl.formatMessage({
                                defaultMessage: 'Close',
                                description: 'Button label',
                            })}
                            aria-label={intl.formatMessage({
                                defaultMessage: 'Close',
                                description: 'Button label',
                            })}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};
ViewerMenuDots.propTypes = propTypes;
ViewerMenuDots.defaultProps = defaultProps;

export default ViewerMenuDots;
