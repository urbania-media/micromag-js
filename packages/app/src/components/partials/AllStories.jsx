/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useLocation } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { Pagination, Spinner } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStories } from '@micromag/data';

import StoriesList from '../lists/Stories';
import EmptyStories from './EmptyStories';

const propTypes = {
    route: PropTypes.string,
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    route: 'home',
    count: 9,
    className: null,
};

const AllStories = ({ route, count, className }) => {
    const url = useUrlGenerator();
    const { search } = useLocation();
    const { page = 1 } = useMemo(
        () => (search !== null && search.length > 0 ? parseQuery(search) : {}),
        [search],
    );
    const finalQuery = useMemo(() => ({}), []);
    const { stories, total, lastPage, loading } = useStories(finalQuery, page, count);
    const paginationUrl = `${url(route)}${
        finalQuery !== null ? `?${stringifyQuery(finalQuery)}` : ''
    }`;

    return (
        <section className={className}>
            {stories !== null ? (
                <>
                    {loading ? <Spinner /> : <StoriesList items={stories} />}
                    {lastPage > 1 ? (
                        <Pagination
                            page={parseInt(page, 10)}
                            total={lastPage}
                            url={paginationUrl}
                            className="mt-4"
                        />
                    ) : null}
                </>
            ) : null}
            {!loading && total === 0 ? <EmptyStories /> : null}
        </section>
    );
};

AllStories.propTypes = propTypes;
AllStories.defaultProps = defaultProps;

export default AllStories;
