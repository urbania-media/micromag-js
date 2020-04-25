/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useItems from '../../hooks/useItems';
import Pagination from '../menus/Pagination';

const propTypes = {
    getPage: PropTypes.func,
    pages: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    paginationUrl: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    withoutPagination: PropTypes.bool,
};

const defaultProps = {
    getPage: null,
    pages: null,
    page: 1,
    paginationUrl: null,
    children: null,
    withoutPagination: false,
};

const AsyncPaginatedList = ({
    getPage,
    pages,
    page: providedPage,
    paginationUrl,
    children,
    withoutPagination,
    ...props
}) => {
    const [page, setPage] = useState(providedPage);
    const state = useItems({
        getPage,
        pages,
        page,
        ...props,
    });
    useEffect(() => {
        if (providedPage !== page) {
            setPage(providedPage);
        }
    }, [providedPage]);
    const { total = 1, items = null } = state;

    const onClickPage = useMemo(
        () => (paginationUrl === null ? newPage => setPage(newPage) : null),
        [paginationUrl],
    );

    return (
        <>
            {typeof children === 'function' ? children(state) : React.cloneElement(children, state)}
            {items !== null && !withoutPagination ? (
                <Pagination
                    url={paginationUrl}
                    page={page}
                    total={total}
                    onClickPage={onClickPage}
                />
            ) : null}
        </>
    );
};

AsyncPaginatedList.propTypes = propTypes;
AsyncPaginatedList.defaultProps = defaultProps;

export default AsyncPaginatedList;
