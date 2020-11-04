/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

// import * as AppPropTypes from '../../lib/PropTypes';
import { useOrganisation } from '../../contexts/OrganisationContext';

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
    const organisation = useOrganisation() || null;
    const finalItems = useMemo(() => {
        const menuItems = [
            {
                id: 'settings',
                href: url('organisation.settings'),
                label: (
                    <FormattedMessage defaultMessage="Settings" description="Settings menu item" />
                ),
            },
            {
                id: 'billing',
                href: url('organisation.billing'),
                label: (
                    <FormattedMessage defaultMessage="Billing" description="Billing menu item" />
                ),
            },
            {
                id: 'team',
                href: url('organisation.team'),
                label: <FormattedMessage defaultMessage="Team" description="Team menu item" />,
            },
            {
                id: 'stats',
                href: url('organisation.stats'),
                label: <FormattedMessage defaultMessage="Stats" description="Stats menu item" />,
            },
            {
                type: 'divider',
            },
            {
                id: 'themes',
                href: url('organisation.themes'),
                label: <FormattedMessage defaultMessage="Themes" description="Themes menu item" />,
            },
            {
                id: 'medias',
                href: url('organisation.medias'),
                label: <FormattedMessage defaultMessage="Medias" description="Medias menu item" />,
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
        const endItems = [
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
        ];
        const organisationsLabel = (
            <FormattedMessage defaultMessage="Organisations" description="Organisations label" />
        );
        return withoutDropdown || asList
            ? menuItems.filter(({ type = 'link' }) => type === 'link')
            : [
                  {
                      id: 'organisations',
                      href: url('home'),
                      label: organisation !== null ? organisation.name : organisationsLabel,
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
                                                  label: organisationsLabel,
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
    }, [url, withoutDropdown, asList, organisations, organisation, pathname]);
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
