/* eslint-disable react/no-array-index-key */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import styles from '../../styles/menus/menu-dots.module.scss';
import MenuDot from './MenuDot';
import MenuIcon from './MenuIcon';

const propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    withShadow: PropTypes.bool,
    items: MicromagPropTypes.menuItems,
    onClickItem: PropTypes.func,
    onClickMenu: PropTypes.func,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    closeable: PropTypes.bool,
    withItemClick: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'horizontal',
    withShadow: false,
    items: [],
    onClickItem: null,
    onClickMenu: null,
    colors: null,
    closeable: false,
    withItemClick: false,
    onClose: null,
    className: null,
};

const ViewerMenuDots = ({
    direction,
    withShadow,
    items,
    onClickItem,
    onClickMenu,
    colors,
    closeable,
    withItemClick,
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
                    const { current = false } = item;
                    return (
                        <MenuDot
                            key={`item-${index + 1}`}
                            current={current}
                            active={index <= currentIndex}
                            colors={colors}
                            onClick={() => {
                                if (withItemClick && onClickItem !== null) {
                                    onClickItem(item);
                                } else if (!withItemClick && onClickMenu !== null) {
                                    onClickMenu();
                                }
                            }}
                            vertical={direction === 'vertical'}
                        />
                    );
                })}
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
