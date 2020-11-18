/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useNav as useNavContext } from '../../contexts/AppContext';
import { useAuth as useAuthContext } from '../../contexts/AuthContext';
import { useOrganisation as useOrganisationContext } from '../../contexts/OrganisationContext';

const propTypes = {
    items: MicromagPropTypes.breadcrumbs,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    className: null,
};

const Breadcrumbs = ({ items: parentItems, className }) => {
    const { loggedIn } = useAuthContext();
    const url = useUrlGenerator();
    const nav = useNavContext();
    const organisation = useOrganisationContext() || null;
    const items = parentItems || [];
    const allItems = items.concat(nav || []);
    const finalItems = allItems.map((it, i) => ({
        url: it.url || null,
        label: it.label || 'Label',
        active: i === allItems.length - 1,
    }));

    // console.log('final items', finalItems);

    if (loggedIn && organisation !== null) {
        return (
            <Breadcrumb
                theme="light"
                separator="arrow"
                withoutBar
                className={className}
                items={[
                    {
                        id: 'home',
                        url: url('home'),
                        label: organisation.name,
                    },
                    ...finalItems,
                ]}
            />
        );
    }

    return loggedIn ? (
        <Breadcrumb
            theme="light"
            separator="arrow"
            withoutBar
            className={className}
            items={[
                {
                    id: 'home',
                    url: url('home'),
                    label: (
                        <FormattedMessage
                            defaultMessage="My Projects"
                            description="Home account page title"
                        />
                    ),
                },
                ...finalItems,
            ]}
        />
    ) : (
        <Breadcrumb
            theme="light"
            separator="arrow"
            withoutBar
            className={className}
            items={items}
        />
    );
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
