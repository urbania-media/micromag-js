/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { useRoutePush } from '@micromag/core/contexts';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';

import { useOrganisation } from '../../contexts/OrganisationContext';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import AllStories from '../partials/AllStories';
import OrganisationStoriesMenubar from '../menubars/OrganisationStories';
import OrganisationSettingsMenubar from '../menubars/OrganisationSettings';

import styles from '../../styles/pages/home.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomeOrganisationPage = ({ className }) => {
    const organisation = useOrganisation();
    const { pathname, search } = useLocation();
    const push = useRoutePush();
    const onFilterChange = useCallback(
        (filters) => {
            const previous = parseQuery(search) || {};
            const query = stringifyQuery({ ...previous, ...filters });
            const next = `${pathname}?${query}`;
            push(next);
        },
        [push, pathname, search],
    );

    return (
        <MainLayout>
            <Page
                title={organisation ? organisation.name : null}
                sidebar={null}
                menubar={
                    <>
                        <OrganisationSettingsMenubar organisation={organisation} />
                        <hr className="border border-light" />
                        <OrganisationStoriesMenubar
                            userCount={0}
                            allCount={0}
                            onFilterChange={onFilterChange}
                        />
                    </>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <AllStories />
            </Page>
        </MainLayout>
    );
};

HomeOrganisationPage.propTypes = propTypes;
HomeOrganisationPage.defaultProps = defaultProps;

export default HomeOrganisationPage;
