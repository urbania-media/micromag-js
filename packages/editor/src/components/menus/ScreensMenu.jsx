/* eslint-disable react/jsx-indent */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import ScreenWithPreview from '../buttons/ScreenWithPreview';
import SortableTree from '../sortable/SortableTree';

import styles from '../../styles/menus/screens.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    withPreview: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    withName: PropTypes.bool,
    settings: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
    withName: false,
    settings: null,
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
    withName,
    settings,
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
                          {
                              [itemClassName]: itemClassName !== null,
                              [itemCustomClassName]: itemCustomClassName !== null,
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
                                  { [settingsClassName]: settingsClassName !== null },
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
                {
                    [styles.noWrap]: noWrap,
                    [styles.isVertical]: isVertical,
                    [styles.isTree]: isTree,
                    [styles.withPlaceholder]: withPlaceholder,
                    [className]: className,
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
};

ScreensMenu.propTypes = propTypes;
ScreensMenu.defaultProps = defaultProps;

export default ScreensMenu;
