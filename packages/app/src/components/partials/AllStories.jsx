/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useLocation } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { Pagination } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStories } from '@micromag/data';

import StoriesList from '../lists/Stories';
import EmptyStories from './EmptyStories';

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 12,
    className: null,
};

const AllStories = ({ count, className }) => {
    const url = useUrlGenerator();
    const { search } = useLocation();
    const { page = 1, ...query } = useMemo(
        () => (search !== null && search.length > 0 ? parseQuery(search) : {}),
        [search],
    );
    const finalQuery = Object.keys(query).length > 0 ? query : null;
    const { stories, total, lastPage, loading } = useStories(finalQuery, page, count);
    const paginationUrl = `${url('stories')}${
        finalQuery !== null ? `?${stringifyQuery(finalQuery)}` : ''
    }`;
    return (
        <section className={className}>
            {stories !== null ? (
                <>
                    <StoriesList items={stories} />

                    {lastPage > 1 ? (
                        <Pagination
                            page={parseInt(page, 10)}
                            total={total}
                            url={paginationUrl}
                            className="mt-2"
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
