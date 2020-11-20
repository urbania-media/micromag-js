/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

// import * as AppPropTypes from '../../lib/PropTypes';
import { useAuth } from '../../contexts/AuthContext';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    withoutDropdown: PropTypes.bool,
    asList: PropTypes.bool,
    asDropdown: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    asList: false,
    asDropdown: false,
    flush: false,
    dropdownAlign: null,
};

const AccountMenu = ({
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    asList,
    asDropdown,
    flush,
    dropdownAlign,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const finalItems = useMemo(() => {
        const subMenu = [
            {
                id: 'profile',
                href: url('account'),
                label: <FormattedMessage defaultMessage="Profile" description="Menu item" />,
            },
            {
                id: 'themes',
                href: url('account.themes'),
                label: <FormattedMessage defaultMessage="Themes" description="Menu item" />,
            },
            {
                id: 'logout',
                href: url('auth.logout'),
                label: <FormattedMessage defaultMessage="Logout" description="Menu item" />,
                onClick: (e) => {
                    e.preventDefault();
                    logout();
                },
            },
        ]
            .filter((it) => it !== null)
            .map((it) =>
                it.href === pathname
                    ? {
                          ...it,
                          active: true,
                      }
                    : it,
            );
        return withoutDropdown || asList
            ? subMenu
            : [
                  {
                      id: 'account',
                      href: url('account'),
                      label: <FormattedMessage defaultMessage="Profile" description="Menu item" />,
                      dropdown: subMenu,
                  },
              ];
    }, [url, logout, pathname, withoutDropdown, asList]);
    return (
        <Menu
            {...props}
            items={finalItems}
            linkAsItem={asList}
            className={classNames({
                'list-group': asList,
                'list-group-flush': asList && flush,
                'dropdown-menu': asDropdown,
                'dropdown-menu-right': asDropdown,
                show: asDropdown,
                [className]: className !== null,
            })}
            itemClassName={classNames({
                'list-group-item': asList,
                'list-group-item-action': asList,
                [itemClassName]: itemClassName !== null,
            })}
            linkClassName={classNames({
                'dropdown-item': asDropdown,
                [linkClassName]: linkClassName !== null,
            })}
            dropdownAlign={dropdownAlign}
        />
    );
};

AccountMenu.propTypes = propTypes;
AccountMenu.defaultProps = defaultProps;

export default AccountMenu;
