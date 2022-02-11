/* eslint-disable react/no-array-index-key */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import styles from '../../styles/menus/menu-dots.module.scss';
import MenuIcon from './MenuIcon';

const propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    withShadow: PropTypes.bool,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    colors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    closeable: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'horizontal',
    withShadow: false,
    items: [],
    current: 0,
    onClickItem: null,
    colors: null,
    closeable: false,
    onClose: null,
    className: null,
};

const ViewerMenuDots = ({
    direction,
    withShadow,
    items,
    current,
    onClickItem,
    colors,
    closeable,
    onClose,
    className,
}) => {
    const { primary = 'rgba(255, 255, 255, 1)', secondary = 'rgba(200, 200, 200, 0.5)' } =
        colors || {};
    const intl = useIntl();
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
                    current: current + 1,
                    total: items.length,
                },
            )}
        >
            <ul className={styles.items}>
                {items.map(({ parentId = null }, index) =>
                    parentId === null ? (
                        <li
                            className={classNames([
                                styles.item,
                                {
                                    [styles.active]: current === index,
                                },
                            ])}
                            key={`item-${index}`}
                            aria-hidden="true"
                        >
                            <button
                                type="button"
                                className={styles.button}
                                onClick={() => {
                                    if (onClickItem !== null) {
                                        onClickItem(index);
                                    }
                                }}
                                tabIndex="-1"
                            >
                                <span
                                    className={styles.dot}
                                    style={{
                                        backgroundColor: index <= current ? primary : secondary,
                                    }}
                                />
                            </button>
                        </li>
                    ) : null,
                )}
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
                        onClick={() => {
                            if (onClickItem !== null) {
                                onClickItem(null);
                            }
                        }}
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
