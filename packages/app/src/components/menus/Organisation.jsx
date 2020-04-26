/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';
import { useOrganisation } from '../../contexts/OrganisationContext';

import styles from '../../styles/menus/organisation.module.scss';

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
    members: {
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
});

const propTypes = {
    items: AppPropTypes.organisations,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const OrganisationsMenu = ({ items, className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    const organisation = useOrganisation();
    const organisationsItems = useMemo(
        () =>
            items
                .filter(it => organisation === null || it.id !== organisation.id)
                .map(it => ({
                    id: it.id,
                    href: url('organisation.switch', {
                        organisation: it.slug,
                    }),
                    label: it.name,
                    active: organisation !== null && organisation.id === it.id,
                })),
        [items, organisation],
    );
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'organisations',
                    href: url('home'),
                    label: organisation !== null ? organisation.name : messages.organisations,
                    dropdown:
                        organisation !== null
                            ? [
                                  {
                                      href: url('organisation.settings'),
                                      label: messages.settings,
                                  },
                                  {
                                      href: url('organisation.billing'),
                                      label: messages.billing,
                                  },
                                  {
                                      href: url('organisation.team'),
                                      label: messages.team,
                                  },
                                  {
                                      type: 'divider',
                                  },
                                  {
                                      href: url('organisation.themes'),
                                      label: messages.themes,
                                  },
                                  {
                                      href: url('organisation.medias'),
                                      label: messages.medias,
                                  },
                                  {
                                      type: 'divider',
                                  },
                                  {
                                      type: 'header',
                                      label: messages.organisations,
                                  },
                                  ...organisationsItems,
                              ]
                            : organisationsItems,
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

OrganisationsMenu.propTypes = propTypes;
OrganisationsMenu.defaultProps = defaultProps;

export default OrganisationsMenu;
