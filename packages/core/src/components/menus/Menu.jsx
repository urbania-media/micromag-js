/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import Link from '../partials/Link';
import Label from '../partials/Label';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    children: PropTypes.node,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    children: null,
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const Menu = ({ items, children, className, itemClassName, linkClassName }) => (
    <ul className={className}>
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
                      ...itemProps
                  } = it;
                  return (
                      <li
                          key={`item-${id || index}`}
                          className={classNames({
                              [itemClassName]: itemClassName !== null,
                              [customClassName]: customClassName !== null,
                          })}
                      >
                          {href !== null ? (
                              <Link
                                  {...itemProps}
                                  href={href}
                                  external={external}
                                  className={classNames({
                                      [linkClassName]: linkClassName !== null,
                                      [customLinkClassName]: customLinkClassName !== null,
                                  })}
                              >
                                  {label}
                              </Link>
                          ) : (
                              <Label {...itemProps}>{label}</Label>
                          )}
                      </li>
                  );
              })}
    </ul>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
