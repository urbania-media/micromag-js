/* eslint-disable react/jsx-indent */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import React, { useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';

import type { MenuItem } from '@micromag/core';

import ScreenWithPreview from '../buttons/ScreenWithPreview';
import SortableTree from '../sortable/SortableTree';

import styles from '../../styles/menus/screens.module.css';

const emptyArray: never[] = [];

interface ScreensMenuProps {
    items?: MenuItem[];
    withPreview?: boolean;
    withPlaceholder?: boolean;
    withName?: boolean;
    settings?: React.ReactNode | ((...args: unknown[]) => void);
    sortable?: boolean;
    isTree?: boolean;
    isVertical?: boolean;
    noWrap?: boolean;
    className?: string;
    itemClassName?: string;
    buttonClassName?: string;
    settingsClassName?: string;
    onClickItem?: (...args: unknown[]) => void;
    onOrderChange?: (...args: unknown[]) => void;
}

function ScreensMenu({
    items = emptyArray,
    withPreview = false,
    withPlaceholder = false,
    withName = false,
    settings = null,
    isVertical = false,
    noWrap = false,
    className = null,
    itemClassName = null,
    buttonClassName = null,
    settingsClassName = null,
    sortable = false,
    isTree = false,
    onClickItem = null,
    onOrderChange = null,
}: ScreensMenuProps) {
    const itemsElements = !isTree
        ? items.map(
              (
                  {
                      className: itemCustomClassName = null,
                      screen,
                      type,
                      title,
                      onClick = null,
                      active,
                      href,
                      ...item
                  },
                  index,
              ) => (
                  <li
                      key={item.id}
                      className={classNames([
                          styles.item,
                          itemCustomClassName,
                          itemClassName,
                          {
                          },
                      ])}
                      data-screen-id={item.id}
                  >
                      <ScreenWithPreview
                          index={index}
                          screen={withPlaceholder ? { ...screen, type } : screen}
                          href={href}
                          className={buttonClassName}
                          title={title}
                          active={active}
                          withPreview={withPreview}
                          withPlaceholder={withPlaceholder}
                          withName={withName}
                          onClick={onClick}
                          onClickItem={onClickItem}
                      />
                      {settings !== null ? (
                          <div
                              className={classNames([
                                  settingsClassName,
                                  styles.settings,
                                  'p-2',
                              ])}
                          >
                              {isFunction(settings) ? settings(index) : settings}
                          </div>
                      ) : null}
                  </li>
              ),
          )
        : [];

    const sortableItems = useMemo(
        () =>
            isTree
                ? items.map(({ id, screen = {}, href, ...props }) => {
                      const { parentId = null, group = {} } = screen;
                      const { collapsed = true } = group || {};
                      return {
                          id,
                          parentId,
                          collapsed,
                          value: { id, screen, href, ...props },
                      };
                  }, [])
                : items.map(({ id }) => ({ id })),
        [items, isTree, items.length],
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.noWrap]: noWrap,
                    [styles.isVertical]: isVertical,
                    [styles.isTree]: isTree,
                    [styles.withPlaceholder]: withPlaceholder,
                },
            ])}
        >
            {isTree && !sortable ? (
                <SortableTree
                    items={sortableItems}
                    component={ScreenWithPreview}
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
}

export default ScreensMenu;
