/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import useDocumentEvent from '../../hooks/useDocumentEvent';
import Link from '../partials/Link';
import Label from '../partials/Label';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    children: PropTypes.node,
    visible: PropTypes.bool,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    onClickItem: PropTypes.func,
    onClickOutside: PropTypes.func,
};

const defaultProps = {
    items: [],
    children: null,
    visible: false,
    className: null,
    itemClassName: null,
    onClickItem: null,
    onClickOutside: null,
};

const Dropdown = ({
    items,
    children,
    visible,
    className,
    itemClassName,
    onClickItem,
    onClickOutside,
}) => {
    const refContainer = useRef(null);
    const onDocumentClick = useCallback(e => {
        if (!refContainer.current.contains(e.currentTarget) && onClickOutside !== null) {
            onClickOutside(e);
        }
    }, [refContainer.current, onClickOutside])
    useDocumentEvent('click', onDocumentClick, visible);
    return (
        <div
            className={classNames([
                'dropdown-menu',
                {
                    show: visible,
                    [className]: className !== null,
                },
            ])}
            ref={refContainer}
        >
            {children !== null
                ? children
                : items.map((it, index) => {
                      const {
                          id,
                          type = 'link',
                          className: customClassName = null,
                          label,
                          children: itemChildren = null,
                          onClick: customOnClick = null,
                          active = false,
                          ...itemProps
                      } = it;
                      const ItemComponent = type === 'link' ? Link : null;
                      const finalOnClickItem =
                          customOnClick !== null || onClickItem !== null
                              ? e => {
                                    if (customOnClick !== null) {
                                        customOnClick(e);
                                    }
                                    if (onClickItem !== null) {
                                        onClickItem(e);
                                    }
                                }
                              : null;
                      return ItemComponent !== null ? (
                          <ItemComponent
                              key={`item-${id || index}`}
                              className={classNames({
                                  'dropdown-item': type === 'link',
                                  'dropdown-divider': type === 'divider',
                                  active,
                                  [itemClassName]: itemClassName !== null,
                                  [customClassName]: customClassName !== null,
                              })}
                              onClick={finalOnClickItem}
                              {...itemProps}
                          >
                              {label !== null ? <Label>{label}</Label> : itemChildren}
                          </ItemComponent>
                      ) : null;
                  })}
        </div>
    );
};

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
