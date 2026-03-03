/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useState } from 'react';

// import Label from '../partials/Label';
import Button from '../buttons/Button';
import Link from '../partials/Link';
import Dropdown from './Dropdown';

interface MenuProps {
    items?: MenuItem[];
    tagName?: string;
    itemTagName?: string;
    children?: React.ReactNode;
    linkAsItem?: boolean;
    className?: string;
    itemClassName?: string;
    linkClassName?: string;
    hasSubMenuClassName?: string;
    subMenuClassName?: string;
    subMenuItemClassName?: string;
    subMenuLinkClassName?: string;
    hasDropdownClassName?: string;
    dropdownClassName?: string;
    dropdownItemClassName?: string;
    dropdownLinkClassName?: string;
    dropdownAlign?: DropdownAlign;
}

function Menu({
    items = [],
    tagName = 'ul',
    itemTagName = 'li',
    children = null,
    linkAsItem = false,
    className = null,
    itemClassName = null,
    linkClassName = null,
    hasSubMenuClassName = null,
    subMenuClassName = null,
    subMenuItemClassName = null,
    subMenuLinkClassName = null,
    hasDropdownClassName = null,
    dropdownClassName = null,
    dropdownItemClassName = null,
    dropdownLinkClassName = null,
    dropdownAlign = null,
}: MenuProps) {
    const [dropdownsVisible, setDropdownsVisible] = useState(items.map(() => false));
    const ListComponent = linkAsItem ? 'div' : tagName;
    return (
        <ListComponent className={className}>
            {children !== null
                ? children
                : items.map((it, index) => {
                      const {
                          id,
                          className: customClassName = null,
                          linkClassName: customLinkClassName = null,
                          href = null,
                          label,
                          external = false,
                          items: subItems = null,
                          dropdown = null,
                          active = false,
                          onClick: customOnClick = null,
                          ...itemProps
                      } = it;
                      const onClickItem =
                          dropdown !== null
                              ? (e) => {
                                    e.preventDefault();
                                    setDropdownsVisible([
                                        ...dropdownsVisible.slice(0, index),
                                        !(dropdownsVisible[index] || false),
                                        ...dropdownsVisible.slice(index + 1),
                                    ]);
                                    if (customOnClick !== null) {
                                        customOnClick(e);
                                    }
                                }
                              : customOnClick;
                      const closeDropdown =
                          dropdown !== null
                              ? () => {
                                    setDropdownsVisible([
                                        ...dropdownsVisible.slice(0, index),
                                        false,
                                        ...dropdownsVisible.slice(index + 1),
                                    ]);
                                }
                              : null;
                      const ItemComponent = itemTagName;
                      return linkAsItem ? (
                          <Link
                              {...itemProps}
                              key={`item-${id || index}`}
                              onClick={onClickItem}
                              href={href}
                              external={external}
                              className={classNames({
                                  active,
                                  [itemClassName]: itemClassName !== null,
                                  [customClassName]: customClassName !== null,
                                  [linkClassName]: linkClassName !== null,
                                  [customLinkClassName]: customLinkClassName !== null,
                              })}
                          >
                              {label}
                          </Link>
                      ) : (
                          <ItemComponent
                              key={`item-${id || index}`}
                              className={classNames({
                                  dropdown: dropdown !== null,
                                  active,
                                  [itemClassName]: itemClassName !== null,
                                  [customClassName]: customClassName !== null,
                                  [hasSubMenuClassName]:
                                      subItems !== null && hasSubMenuClassName !== null,
                                  [hasDropdownClassName]:
                                      subItems !== null && hasDropdownClassName !== null,
                              })}
                          >
                              {href !== null ? (
                                  <Link
                                      {...itemProps}
                                      onClick={onClickItem}
                                      href={href}
                                      external={external}
                                      className={classNames({
                                          [linkClassName]: linkClassName !== null,
                                          'dropdown-toggle': dropdown !== null,
                                          [customLinkClassName]: customLinkClassName !== null,
                                      })}
                                  >
                                      {label}
                                  </Link>
                              ) : null}
                              {href === null && onClickItem !== null ? (
                                  <Button
                                      {...itemProps}
                                      onClick={onClickItem}
                                      className={classNames({
                                          [linkClassName]: linkClassName !== null,
                                          'dropdown-toggle': dropdown !== null,
                                          [customLinkClassName]: customLinkClassName !== null,
                                      })}
                                  >
                                      {label}
                                  </Button>
                              ) : null}
                              {subItems !== null ? (
                                  <Menu
                                      items={subItems}
                                      className={subMenuClassName}
                                      itemClassName={classNames({
                                          [subMenuItemClassName]: subMenuItemClassName !== null,
                                          [itemClassName]:
                                              subMenuItemClassName === null &&
                                              itemClassName !== null,
                                      })}
                                      linkClassName={classNames({
                                          [subMenuLinkClassName]: subMenuLinkClassName !== null,
                                          [linkClassName]:
                                              subMenuLinkClassName === null &&
                                              linkClassName !== null,
                                      })}
                                  />
                              ) : null}
                              {dropdown !== null ? (
                                  <Dropdown
                                      items={dropdown}
                                      visible={dropdownsVisible[index] || false}
                                      className={dropdownClassName}
                                      itemClassName={classNames({
                                          [dropdownItemClassName]: dropdownItemClassName !== null,
                                          [itemClassName]:
                                              dropdownItemClassName === null &&
                                              itemClassName !== null,
                                      })}
                                      linkClassName={classNames({
                                          [dropdownLinkClassName]: dropdownLinkClassName !== null,
                                          [linkClassName]:
                                              dropdownLinkClassName === null &&
                                              linkClassName !== null,
                                      })}
                                      align={dropdownAlign}
                                      onClickItem={closeDropdown}
                                      onClickOutside={closeDropdown}
                                  />
                              ) : null}
                          </ItemComponent>
                      );
                  })}
        </ListComponent>
    );
}

export default Menu;
