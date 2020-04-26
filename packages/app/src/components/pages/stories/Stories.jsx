/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useLocation } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { AsyncPaginatedList, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useApi } from '../../../contexts/ApiContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoriesList from '../../lists/Stories';

import styles from '../../../styles/pages/stories/stories.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.stories.title',
        defaultMessage: 'Stories',
    },
    create: {
        id: 'pages.stories.create',
        defaultMessage: 'Create a new story',
    },
});

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 1,
    className: null,
};

const StoriesPage = ({ count, className }) => {
    const url = useUrlGenerator();
    const { search } = useLocation();
    const { page = 1, ...query } = useMemo(
        () => (search !== null && search.length > 0 ? parseQuery(search) : {}),
        [search],
    );
    const queryString = Object.keys(query).length > 0 ? `${stringifyQuery(query)}` : null;
    const api = useApi();
    const getPage = useCallback(pageRequested => api.stories.get(query, pageRequested, count), [
        queryString,
        count,
    ]);
    const paginationUrl = `${url('stories')}${queryString !== null ? `?${queryString}` : ''}`;
    return (
        <MainLayout>
            <Page
                title={messages.title}
                sidebar={
                    <div className={styles.actions}>
                        <Button href={url('stories.create')} theme="primary" className={styles.button}>
                            {messages.create}
                        </Button>
                    </div>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <AsyncPaginatedList
                    getPage={getPage}
                    page={parseInt(page, 10)}
                    paginationUrl={paginationUrl}
                >
                    {({ pageItems }) =>
                        pageItems !== null ? <StoriesList items={pageItems} /> : 'Loading...'
                    }
                </AsyncPaginatedList>
            </Page>
        </MainLayout>
    );
};

StoriesPage.propTypes = propTypes;
StoriesPage.defaultProps = defaultProps;

export default StoriesPage;
