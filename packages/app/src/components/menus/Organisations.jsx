/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';
import { useOrganisation } from '../../contexts/OrganisationContext';

import styles from '../../styles/menus/organisations.module.scss';

const messages = defineMessages({
    organisations: {
        id: 'menus.organisations',
        defaultMessage: 'Organisations',
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
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'organisations',
                    href: url('home'),
                    label: messages.organisations,
                    dropdown: items.map(it => ({
                        id: it.id,
                        href: url('organisation.switch', {
                            organisation: it.slug,
                        }),
                        label: it.name,
                        active: (organisation !== null && organisation.id === it.id),
                    })),
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
