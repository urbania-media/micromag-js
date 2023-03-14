import isString from 'lodash/isString';
import { parse as parseQuery } from 'query-string';
import { useEffect, useState, useMemo, useCallback } from 'react';

const useItems = ({
    getPage = null,
    page = 1,
    count = 10,
    query: pageQuery = null, // string or object
    pages: startingPages = null,
    getPageFromResponse = (newPage) => newPage,
    getPagination = ({ current_page: cp, per_page: pp, last_page: lp, total } = {}) => ({
        pageNumber: cp,
        pageCount: pp,
        lastPage: lp,
        total,
    }),
    onLoaded = null,
    onError = null,
}) => {
    // Pagination
    const [paginated, setPaginated] = useState(page !== null);
    const [pagination, setPagination] = useState(null);
    const {
        pageNumber = page,
        pageCount = count,
        lastPage = null,
        total = null,
    } = getPagination(pagination || {});

    const { data: initialPages, pagination: initialPagination } = useMemo(
        () =>
            (startingPages || []).reduce(
                (paginatedData, it) => {
                    const { data: items, pagination: currentPagination } = it || {};
                    // eslint-disable-next-line no-param-reassign
                    paginatedData.data = paginatedData.data.concat(items);
                    // eslint-disable-next-line no-param-reassign
                    paginatedData.pagination = currentPagination;
                    return paginatedData;
                },
                { data: [], pagination: {} },
            ),
        [startingPages],
    );
    const [canLoad, setCanLoad] = useState(startingPages === null);
    const [loading, setLoading] = useState(false);

    // Query
    const query = useMemo(
        () => ({
            ...(isString(pageQuery)
                ? parseQuery(pageQuery || null, {
                      arrayFormat: 'bracket',
                  })
                : pageQuery),
        }),
        [pageQuery],
    );

    // Items
    const [items, setItems] = useState(null);
    const getPages = useCallback(
        (newQuery, newPageNumber, newPageCount) => getPage(newQuery, newPageNumber, newPageCount),
        [getPage],
    );

    // Api has changed, reset to beginning
    useEffect(() => {
        setItems(initialPages);
        setPagination(initialPagination);
    }, [getPages, setItems, setPagination]);

    useEffect(() => {
        // eslint-disable-next-line
        // console.log('try to load');
        if (!canLoad || loading || (lastPage !== null && pageNumber > lastPage)) {
            // console.log('skips loading');
            return;
        }
        // eslint-disable-next-line
        // console.log('actually load', canLoad, loading, lastPage, pageNumber);
        setLoading(true);
        setCanLoad(false);
        // TODO: make this a cancellable promise
        getPages(query, pageNumber, pageCount)
            .then((response) => getPageFromResponse(response))
            .then((response) => {
                const { data = null, meta = null } = response || {};
                // console.log('response --- ', response);
                //  This is not a paginated list so we dont care anymore
                if (data === null && meta === null) {
                    setItems(response);
                    setPaginated(false);
                } else {
                    setItems((old) => [...(old || null), ...data]);
                    setPagination(meta);
                    setPaginated(true);
                }
                return response;
            })
            .then((response) => {
                setLoading(false);
                if (onLoaded !== null) {
                    onLoaded(response);
                }
            })
            .catch((e) => {
                // Error is real
                setLoading(false);
                if (onError !== null) {
                    onError(e);
                }
            });
    }, [
        query,
        pageNumber,
        canLoad,
        getPages,
        setLoading,
        setItems,
        setPagination,
        onLoaded,
        onError,
    ]);

    const reset = useCallback(() => {
        setItems([]);
        setPagination(null);
        setCanLoad(true);
    }, [setItems, setPagination, setCanLoad]);

    // Resets the game, "natural" refresh
    const onQueryChange = useEffect(() => {
        reset();
    }, [query, page, count, reset]);

    // Handle to Load next
    const loadNextPage = useCallback(() => {
        if (!loading && pageNumber < lastPage) {
            const params = { ...pagination, current_page: pageNumber + 1, per_page: pageCount };
            setPagination(params);
            setCanLoad(true);
        }
    }, [query, pagination, pageNumber, pageCount, loading, lastPage, onQueryChange, setCanLoad]);

    const disabled =
        (items || []).length === 0 ||
        loading ||
        pageNumber >= lastPage ||
        lastPage === null ||
        lastPage === 1;

    const regularLoaded = !paginated && items !== null;
    const paginatedLoaded =
        !loading && items !== null && (items.length === total || pageNumber >= lastPage);

    return {
        items,
        total,
        page: pageNumber,
        count: pageCount,
        lastPage,
        loading,
        loaded: !loading,
        allLoaded: regularLoaded || paginatedLoaded,
        disabled,
        loadNextPage,
        reset,
    };
};

export default useItems;
