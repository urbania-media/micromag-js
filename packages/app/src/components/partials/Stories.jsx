/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useLocation } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { Spinner, Detector, Button } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';
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
    count: 6,
    className: null,
};

const Stories = ({ route, count, className }) => {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { search } = useLocation();
    const { page = 1 } = useMemo(
        () => (search !== null && search.length > 0 ? parseQuery(search) : {}),
        [search],
    );
    const finalQuery = useMemo(() => ({}), []);
    const { allStories, total, lastPage, loading } = useStories(finalQuery, page, count);

    const loadNextPage = useCallback(() => {
        push({
            pathname: url(route),
            search: stringifyQuery({
                ...finalQuery,
                page: Math.min(parseInt(page, 10) + 1, lastPage),
            }),
        });
    }, [push, search, finalQuery, page, lastPage]);

    const complete = loading && page < lastPage;

    return (
        <section className={className}>
            {allStories !== null ? <StoriesList items={allStories} /> : null}
            {!complete ? (
                <Detector onEnter={loadNextPage} disabled={loading || page === total}>
                    {loading ? <Spinner /> : null}
                    {!loading && page < lastPage ? (
                        <Button theme="primary" onClick={loadNextPage}>
                            More
                        </Button>
                    ) : null}
                </Detector>
            ) : null}
            {!loading && total === 0 ? <EmptyStories /> : null}
        </section>
    );
};

Stories.propTypes = propTypes;
Stories.defaultProps = defaultProps;

export default Stories;
