/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

// import * as AppPropTypes from '../../lib/PropTypes';
import { useOrganisation } from '../../contexts/OrganisationContext';

const messages = defineMessages({
    organisations: {
        id: 'menus.organisation.organisations',
        defaultMessage: 'Organisations',
    },
    settings: {
        id: 'menus.organisation.settings',
        defaultMessage: 'Settings',
    },
    billing: {
        id: 'menus.organisation.billing',
        defaultMessage: 'Billing',
    },
    team: {
        id: 'menus.organisation.team',
        defaultMessage: 'Team',
    },
    themes: {
        id: 'menus.organisation.themes',
        defaultMessage: 'Themes',
    },
    medias: {
        id: 'menus.organisation.medias',
        defaultMessage: 'Medias',
    },
    create: {
        id: 'menus.organisation.create',
        defaultMessage: 'Create an organisation',
    },
});

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    withoutDropdown: PropTypes.bool,
    asList: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    asList: false,
    flush: false,
    dropdownAlign: null,
};

const OrganisationsMenu = ({
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    asList,
    flush,
    dropdownAlign,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const { organisations } = useOrganisations();
    const organisation = useOrganisation();
    const finalItems = useMemo(() => {
        const menuItems = [
            {
                id: 'settings',
                href: url('organisation.settings'),
                label: messages.settings,
            },
            {
                id: 'billing',
                href: url('organisation.billing'),
                label: messages.billing,
            },
            {
                id: 'team',
                href: url('organisation.team'),
                label: messages.team,
            },
            {
                type: 'divider',
            },
            {
                id: 'themes',
                href: url('organisation.themes'),
                label: messages.themes,
            },
            {
                id: 'medias',
                href: url('organisation.medias'),
                label: messages.medias,
            },
        ]
            .filter(it => it !== null)
            .map(it =>
                it.href === pathname
                    ? {
                          ...it,
                          active: true,
                      }
                    : it,
            );
        const organisationsItems =
            organisations !== null
                ? organisations
                      .filter(it => organisation === null || it.id !== organisation.id)
                      .map(it => ({
                          id: it.id,
                          href: url('organisation.switch', {
                              organisation: it.slug,
                          }),
                          label: it.name,
                          active: organisation !== null && organisation.id === it.id,
                      }))
                : [];
        const endItems = [
            {
                id: 'create',
                href: url('organisation.create'),
                label: messages.create,
            },
        ];
        return withoutDropdown || asList
            ? menuItems.filter(({ type = 'link' }) => type === 'link')
            : [
                  {
                      id: 'organisations',
                      href: url('home'),
                      label: organisation !== null ? organisation.name : messages.organisations,
                      dropdown:
                          organisation !== null
                              ? [
                                    ...menuItems,
                                    ...(organisationsItems.length > 1
                                        ? [
                                              {
                                                  type: 'divider',
                                              },
                                              {
                                                  type: 'header',
                                                  label: messages.organisations,
                                              },
                                              ...organisationsItems,
                                              {
                                                  type: 'divider',
                                              },
                                              ...endItems,
                                          ]
                                        : [
                                              {
                                                  type: 'divider',
                                              },
                                              ...endItems,
                                          ]),
                                ]
                              : [...organisationsItems, ...endItems],
                  },
              ];
    }, [url, messages, withoutDropdown, asList, organisations, organisation, pathname]);
    return (
        <Menu
            {...props}
            linkAsItem={asList}
            items={finalItems}
            className={classNames({
                'list-group': asList,
                'list-group-flush': asList && flush,
                [className]: className !== null,
            })}
            itemClassName={classNames({
                'list-group-item': asList,
                'list-group-item-action': asList,
                'list-group-item-dark': asList,
                [itemClassName]: itemClassName !== null,
            })}
            linkClassName={linkClassName}
        />
    );
};

OrganisationsMenu.propTypes = propTypes;
OrganisationsMenu.defaultProps = defaultProps;

export default OrganisationsMenu;
