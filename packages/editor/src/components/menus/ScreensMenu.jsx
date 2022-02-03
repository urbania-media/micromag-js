/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styles from '../../styles/menus/screens.module.scss';
import ScreenWithPreview from '../buttons/ScreenWithPreview';
import SortableTree from '../sortable/SortableTree';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    withPreview: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    settings: PropTypes.node,
    previewMinWidth: PropTypes.number,
    sortable: PropTypes.bool,
    isTree: PropTypes.bool,
    isVertical: PropTypes.bool,
    noWrap: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    settingsClassName: PropTypes.string,
    onClickItem: PropTypes.func,
    onOrderChange: PropTypes.func,
};

const defaultProps = {
    items: [],
    withPreview: false,
    withPlaceholder: false,
    settings: null,
    previewMinWidth: 320,
    sortable: false,
    isTree: false,
    isVertical: false,
    noWrap: false,
    className: null,
    itemClassName: null,
    buttonClassName: null,
    settingsClassName: null,
    onClickItem: null,
    onOrderChange: null,
};

const ScreensMenu = ({
    items,
    withPreview,
    withPlaceholder,
    settings,
    previewMinWidth,
    isVertical,
    noWrap,
    className,
    itemClassName,
    buttonClassName,
    settingsClassName,
    sortable,
    isTree,
    onClickItem,
    onOrderChange,
}) => {
    const {
        ref: containerRef,
        entry: { contentRect },
    } = useResizeObserver({}, [items]);

    const {
        ref: columnRef,
        entry: { contentRect: columnRect },
    } = useResizeObserver({}, [items]);

    const previewStyle = useMemo(() => {
        const { width: itemWidth = 0, height: itemHeight = 0 } = contentRect || {};
        const ratio = itemHeight !== 0 && itemWidth !== 0 ? itemHeight / itemWidth : 2 / 3;
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

    const treeStyle = useMemo(() => {
        const { width: itemWidth = 0 } = columnRect || {};
        const itemHeight = (itemWidth * 3) / 2;
        const ratio = itemHeight !== 0 && itemWidth !== 0 ? itemHeight / itemWidth : 0;
        const {
            width: scaledWidth,
            height: scaledHeight,
            scale: previewScale,
        } = getSizeWithinBounds(previewMinWidth, previewMinWidth * ratio, itemWidth, itemHeight);

        return {
            width: previewMinWidth,
            height: previewMinWidth * ratio,
            transform: `scale(${previewScale}, ${previewScale})`,
            scale: previewScale,
            scaledWidth,
            scaledHeight,
        };
    }, [previewMinWidth, columnRect]);

    const itemsElements = !isTree
        ? items.map(({ className: itemCustomClassName = null, screen, type, ...item }, index) => (
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
                  <ScreenWithPreview
                      index={index}
                      screen={{ ...screen, ...(withPlaceholder ? { type } : null) }}
                      buttonClassName={buttonClassName}
                      previewStyle={previewStyle}
                      withPreview={withPreview}
                      withPlaceholder={withPlaceholder}
                      onClick={onClickItem}
                  />
                  {settings !== null ? (
                      <div
                          className={classNames([
                              { [settingsClassName]: settingsClassName !== null },
                              styles.settings,
                              'p-2',
                          ])}
                      >
                          {isFunction(settings) ? settings(index) : settings}
                      </div>
                  ) : null}
              </li>
          ))
        : [];

    const sortableItems = useMemo(
        () =>
            isTree
                ? items.reduce((acc, { id, screen = {}, ...props }) => {
                      const { parentId = null } = screen;
                      // console.log('hey', id, screen, parentId, props);
                      //   const children =
                      //       items.filter(({ screen: { parentId: cpid = null } }) => cpid === id) ||
                      //       [];
                      // console.log('children', children);
                      acc.push({
                          id,
                          parentId,
                          screenValue: { id, screen },
                          ...props,
                          // ...(children.length > 0 ? { children: [...children] } : null),
                      });
                      return acc;
                  }, [])
                : items.map(({ id }) => ({ id })),
        [items, isTree],
    );

    // console.log('screens menu items/sitems', items, sortableItems);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.noWrap]: noWrap,
                    [styles.isVertical]: isVertical,
                    [styles.isTree]: isTree,
                    [styles.withPlaceholder]: withPlaceholder,
                    [className]: className,
                },
            ])}
            ref={columnRef}
        >
            {isTree && !sortable ? (
                <SortableTree
                    items={sortableItems}
                    component={ScreenWithPreview}
                    itemStyle={treeStyle}
                    onClickItem={onClickItem}
                    onChange={onOrderChange}
                />
            ) : null}
            {!isTree && sortable && items.length > 1 ? (
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
            ) : null}
            {!isTree && (!sortable || items.length < 1) ? (
                <ul className={styles.items}>{itemsElements}</ul>
            ) : null}
        </div>
    );
};

ScreensMenu.propTypes = propTypes;
ScreensMenu.defaultProps = defaultProps;

export default ScreensMenu;