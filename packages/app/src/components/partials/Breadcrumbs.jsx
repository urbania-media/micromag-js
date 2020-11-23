/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { Breadcrumb } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSizeFromWindow } from '@micromag/core/hooks';

import { useNav as useNavContext } from '../../contexts/AppContext';
import { useAuth as useAuthContext } from '../../contexts/AuthContext';
import { useOrganisation as useOrganisationContext } from '../../contexts/OrganisationContext';

import BackButton from '../buttons/Back';

const propTypes = {
    items: MicromagPropTypes.breadcrumbs,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    className: null,
};

const Breadcrumbs = ({ items: parentItems, className }) => {
    const { pathname } = useLocation();
    const { width } = useScreenSizeFromWindow();
    const { loggedIn } = useAuthContext();
    const url = useUrlGenerator();
    const nav = useNavContext();
    const organisation = useOrganisationContext() || null;
    const sizes = [
        { width: 500, length: 1 },
        { width: 769, length: 2 },
    ];

    const items = parentItems || [];
    const allItems = items.concat(nav || []);
    const otherItems = allItems.map((it, i) => ({
        url: it.url || null,
        label: it.label || 'Label',
        active: i === allItems.length - 1,
    }));

    const itemsByOrganisation =
        organisation !== null
            ? [
                  {
                      id: 'home',
                      url: url('home'),
                      label: organisation.name,
                  },
                  ...otherItems,
              ]
            : [
                  {
                      id: 'home',
                      url: url('home'),
                      label: (
                          <FormattedMessage
                              defaultMessage="My Stories"
                              description="Home account page title"
                          />
                      ),
                  },
                  ...otherItems,
              ];

    const finalItems = loggedIn ? itemsByOrganisation : items;

    const maxSize = sizes.find((s) => width < s.width);
    const itemsBySize =
        maxSize && finalItems.length > maxSize.length
            ? finalItems.slice(finalItems.length - maxSize.length, finalItems.length)
            : finalItems;

    const previousItem =
        maxSize && finalItems.length > maxSize.length
            ? finalItems[finalItems.length - 1 - maxSize.length]
            : finalItems;

    const previousUrl = pathname === url('home') ? url('organisations') : previousItem.url;

    return (
        <div className="d-flex align-items-center justify-content-center">
            {maxSize && pathname !== url('organisations') ? (
                <BackButton className="mr-2" href={previousUrl} />
            ) : null}
            <Breadcrumb
                theme="light"
                separator="arrow"
                withoutBar
                className={className}
                items={itemsBySize}
            />
        </div>
    );
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
