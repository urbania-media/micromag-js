/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { getSizeWithinBounds } from '@folklore/size';
import { ReactSortable } from 'react-sortablejs';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';
import { ScreenPreview, ScreenPlaceholder } from '@micromag/core/components';
import { isMessage } from '@micromag/core/utils';

import ScreenButton from '../buttons/Screen';

import styles from '../../styles/menus/screens.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    withPreview: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    previewMinWidth: PropTypes.number,
    sortable: PropTypes.bool,
    isVertical: PropTypes.bool,
    noWrap: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    onClickItem: PropTypes.func,
    onOrderChange: PropTypes.func,
};

const defaultProps = {
    items: [],
    withPreview: false,
    withPlaceholder: false,
    previewMinWidth: 320,
    sortable: false,
    isVertical: false,
    noWrap: false,
    className: null,
    itemClassName: null,
    buttonClassName: null,
    onClickItem: null,
    onOrderChange: null,
};

const ScreensMenu = ({
    items,
    withPreview,
    withPlaceholder,
    previewMinWidth,
    isVertical,
    noWrap,
    className,
    itemClassName,
    buttonClassName,
    sortable,
    onClickItem,
    onOrderChange,
}) => {
    const intl = useIntl();
    const {
        ref: containerRef,
        entry: { contentRect },
    } = useResizeObserver({}, [items]);
    const previewStyle = useMemo(() => {
        const { width: itemWidth = 0, height: itemHeight = 0 } = contentRect || {};
        const ratio = itemHeight !== 0 && itemWidth !== 0 ? itemHeight / itemWidth : 0;
        const { scale: previewScale } = getSizeWithinBounds(
            previewMinWidth,
            previewMinWidth * ratio,
            itemWidth,
            itemHeight,
        );
        return {
            width: previewMinWidth,
            height: previewMinWidth * ratio,
            transform: `scale(${previewScale}, ${previewScale})`,
        };
    }, [previewMinWidth, contentRect]);
    const itemsElements = items.map(({ onClick = null, title, screen, className: itemCustomClassName = null, ...item }, index) => (
        <li
            key={item.id}
            className={classNames([
                styles.item,
                {
                    [itemClassName]: itemClassName !== null,
                    [itemCustomClassName]: itemCustomClassName !== null,
                },
            ])}
            data-screen-id={item.id}
            ref={index === 0 ? containerRef : null}
        >
            <ScreenButton
                {...item}
                className={classNames([
                    styles.button,
                    {
                        [buttonClassName]: buttonClassName !== null,
                    },
                ])}
                title={isMessage(title) ? intl.formatMessage(title) : null}
                onClick={() => {
                    if (onClick !== null) {
                        onClick(screen, index);
                    }
                    if (onClickItem !== null) {
                        onClickItem(screen, index);
                    }
                }}
            >
                {withPreview ? (
                    <div className={styles.preview} style={previewStyle}>
                        <ScreenPreview
                            screen={screen}
                            width={previewStyle.width}
                            height={previewStyle.height}
                            className={styles.screen}
                        />
                    </div>
                ) : null}
                {withPlaceholder ? (
                    <div className={styles.placeholder} style={previewStyle}>
                        <ScreenPlaceholder
                            screen={item}
                            width={previewStyle.width}
                            height={previewStyle.height}
                            className={styles.screen}
                        />
                    </div>
                ) : null}
            </ScreenButton>
        </li>
    ));
    const sortableItems = useMemo(() => items.map(({ id }) => ({ id })), [items]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.noWrap]: noWrap,
                    [styles.isVertical]: isVertical,
                    [styles.withPlaceholder]: withPlaceholder,
                    [className]: className,
                },
            ])}
        >
            {sortable && items.length > 1 ? (
                <ReactSortable
                    list={sortableItems}
                    setList={onOrderChange}
                    animation={200}
                    delayOnTouchStart
                    delay={2}
                    tag="ul"
                    className={styles.items}
                >
                    {itemsElements}
                </ReactSortable>
            ) : (
                <ul className={styles.items}>{itemsElements}</ul>
            )}
        </div>
    );
};

ScreensMenu.propTypes = propTypes;
ScreensMenu.defaultProps = defaultProps;

export default ScreensMenu;
