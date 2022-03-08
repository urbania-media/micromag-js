/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDocumentEvent } from '../../hooks';
import { PropTypes as MicromagPropTypes } from '../../lib';
// import Button from '../buttons/Button';
import Label from '../partials/Label';
import Link from '../partials/Link';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    children: PropTypes.node,
    visible: PropTypes.bool,
    align: MicromagPropTypes.dropdownAlign,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    onClickItem: PropTypes.func,
    onClickOutside: PropTypes.func,
};

const defaultProps = {
    items: [],
    children: null,
    visible: false,
    align: null,
    className: null,
    itemClassName: null,
    onClickItem: null,
    onClickOutside: null,
};

const Dropdown = ({
    items,
    children,
    visible,
    align,
    className,
    itemClassName,
    onClickItem,
    onClickOutside,
}) => {
    const refContainer = useRef(null);
    const [enabled, setEnabled] = useState(visible);

    const onDocumentClick = useCallback(
        (e) => {
            if (
                refContainer.current &&
                !refContainer.current.contains(e.currentTarget) &&
                onClickOutside !== null
            ) {
                onClickOutside(e);
            }
        },
        [refContainer.current, onClickOutside],
    );
    useDocumentEvent('click', onDocumentClick, enabled);

    // Delay the outside click detection
    useEffect(() => {
        const id = setTimeout(() => {
            setEnabled(visible);
        }, 100);
        return () => {
            clearTimeout(id);
        };
    }, [visible, setEnabled]);

    return (
        <div
            className={classNames([
                'dropdown-menu',
                {
                    [`dropdown-menu-${align}`]: align !== null,
                    [`show`]: visible,
                    [className]: className !== null,
                },
            ])}
            ref={refContainer}
        >
            {children !== null
                ? children
                : items.map((it, index) => {
                      const {
                          // id = null,
                          type = 'link',
                          className: customClassName = null,
                          label = null,
                          children: itemChildren = null,
                          onClick: customOnClick = null,
                          active = false,
                          ...itemProps
                      } = it;
                      let ItemComponent = 'div';
                      if (type === 'link') {
                          ItemComponent = Link;
                      } else if (type === 'button') {
                          ItemComponent = 'button';
                      } else if (type === 'header') {
                          ItemComponent = 'h6';
                      } else if (type === 'divider') {
                          ItemComponent = 'hr';
                      }
                      const finalOnClickItem =
                          customOnClick !== null || (type === 'link' && onClickItem !== null)
                              ? (e) => {
                                    if (customOnClick !== null) {
                                        customOnClick(e);
                                    }
                                    if (type === 'link' && onClickItem !== null) {
                                        onClickItem(e);
                                    }
                                }
                              : null;
                      return ItemComponent !== null ? (
                          <li>
                              <ItemComponent
                                  key={`item-${index}-${label}`}
                                  className={classNames([
                                      {
                                          'dropdown-item': type === 'link' || type === 'button',
                                          'dropdown-divider': type === 'divider',
                                          'dropdown-header': type === 'header',
                                          active,
                                          [itemClassName]: itemClassName !== null,
                                          [customClassName]: customClassName !== null,
                                      },
                                  ])}
                                  onClick={finalOnClickItem}
                                  {...itemProps}
                              >
                                  {label !== null ? <Label>{label}</Label> : itemChildren}
                              </ItemComponent>
                          </li>
                      ) : null;
                  })}
        </div>
    );
};

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
