import classNames from 'classnames';
import { type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';

import { useDocumentEvent } from '../../hooks';

import { DropdownAlign, MenuItem } from '../../types';
import Label from '../partials/Label';
import Link from '../partials/Link';

const emptyArray: never[] = [];

interface DropdownProps {
    items?: MenuItem[];
    children?: ReactNode | null;
    visible?: boolean;
    align?: DropdownAlign | null;
    className?: string | null;
    itemClassName?: string | null;
    onClickItem?: ((...args: unknown[]) => void) | null;
    onClickOutside?: ((...args: unknown[]) => void) | null;
}

function Dropdown({
    items = emptyArray,
    children = null,
    visible = false,
    align = null,
    className = null,
    itemClassName = null,
    onClickItem = null,
    onClickOutside = null,
}: DropdownProps) {
    const containerRef = useRef(null);
    const [enabled, setEnabled] = useState(visible);

    const onDocumentClick = (e) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(e.currentTarget) &&
            !containerRef.current.contains(e.target) &&
            onClickOutside !== null
        ) {
            onClickOutside(e);
        }
    };
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
                align !== null ? `dropdown-menu-${align}` : null,
                {
                    show: visible,
                },
                className,
            ])}
            style={{
                inset: align === 'end' ? '100% 0px auto auto' : null,
            }}
            ref={containerRef}
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
                      let ItemComponent: ElementType = 'div';
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
                          <div key={`item-${index + 1}-${label}-${type}`}>
                              <ItemComponent
                                  className={classNames([
                                      customClassName,
                                      itemClassName,
                                      {
                                          'dropdown-item': type === 'link' || type === 'button',
                                          'dropdown-divider': type === 'divider',
                                          'dropdown-header': type === 'header',
                                          active,
                                      },
                                  ])}
                                  onClick={finalOnClickItem}
                                  {...itemProps}
                              >
                                  {label !== null ? <Label>{label}</Label> : itemChildren}
                              </ItemComponent>
                          </div>
                      ) : null;
                  })}
        </div>
    );
}

export default Dropdown;
