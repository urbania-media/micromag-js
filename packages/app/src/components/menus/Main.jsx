/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

import {
    useOrganisation as useOrganisationContext,
    useSetOrganisation as useSetOrganisationContext,
} from '../../contexts/OrganisationContext';
import { useAuth as useAuthContext } from '../../contexts/AuthContext';

import Avatar from '../partials/Avatar';

import styles from '../../styles/menus/main.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const MainMenu = ({ className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const { logout, user } = useAuthContext();
    const setOrganisation = useSetOrganisationContext();
    const organisation = useOrganisationContext() || null;
    const { organisations } = useOrganisations();

    const organisationsItems =
        organisations !== null
            ? organisations
                  .filter((it) => organisation === null || it.id !== organisation.id)
                  .map((it) => ({
                      id: it.id,
                      href: url('organisation.switch', {
                          organisation: it.slug,
                      }),
                      label: it.name,
                      active: organisation !== null && organisation.id === it.id,
                  }))
            : [];

    const finalOrganisationItems =
        organisationsItems.length > 0
            ? [
                  ...organisationsItems,
                  {
                      type: 'divider',
                      label: null,
                  },
              ]
            : [];

    const onClickMyMicromags = useCallback(() => {
        setOrganisation(null);
    }, [setOrganisation]);

    const onClickLogout = useCallback(
        (e) => {
            e.preventDefault();
            logout();
        },
        [logout],
    );

    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'stories',
                    href: url('stories'),
                    label: user ? (
                        <Avatar className="d-inline-block" color="#ccc" {...user} />
                    ) : (
                        <FormattedMessage
                            defaultMessage="Account"
                            description="Account top menu label"
                        />
                    ),
                    dropdown: [
                        ...finalOrganisationItems,
                        {
                            id: 'create',
                            href: url('organisation.create'),
                            label: (
                                <FormattedMessage
                                    defaultMessage="Create an organisation"
                                    description="Create an organisation button"
                                />
                            ),
                        },
                        {
                            type: 'divider',
                            label: null,
                        },
                        {
                            id: 'home',
                            href: url('home'),
                            onClick: onClickMyMicromags,
                            active: pathname === url('home'),
                            label: (
                                <FormattedMessage
                                    defaultMessage="My micromags"
                                    description="My micromags menu item"
                                />
                            ),
                        },
                        {
                            id: 'account',
                            href: url('account'),
                            active: pathname === url('account'),
                            label: (
                                <FormattedMessage
                                    defaultMessage="My profile"
                                    description="My profile menu item"
                                />
                            ),
                        },
                        {
                            id: 'logout',
                            href: url('logout'),
                            label: (
                                <FormattedMessage
                                    defaultMessage="Logout"
                                    description="Logout menu item"
                                />
                            ),
                            onClick: onClickLogout,
                        },
                    ],
                },
            ]}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            itemClassName={itemClassName}
            linkClassName={linkClassName}
        />
    );
};

MainMenu.propTypes = propTypes;
MainMenu.defaultProps = defaultProps;

export default MainMenu;
