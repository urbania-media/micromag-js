import classNames from 'classnames';
import queryString from 'query-string';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '../partials/Link';

interface PaginationMenuProps {
    page?: number;
    lastPage?: number;
    maxPages?: number;
    total?: number;
    url?: string | null;
    query?: Record<string, unknown> | null;
    withPreviousNext?: boolean;
    className?: string | null;
    paginationClassName?: string | null;
    itemClassName?: string | null;
    linkClassName?: string | null;
    onClickPage?: ((...args: unknown[]) => void) | null;
}

function PaginationMenu({
    page: parentPage = 1,
    lastPage: parentLastPage = 1,
    maxPages: parentMaxPages = 10,
    total: parentTotal = 1,
    url = null,
    query = null,
    withPreviousNext = false,
    className = null,
    paginationClassName = null,
    itemClassName = null,
    linkClassName = null,
    onClickPage = null,
}: PaginationMenuProps) {
    const getUrl = useCallback(
        (currentPage) =>
            url !== null
                ? `${url}?${queryString.stringify(
                      { ...query, page: currentPage },
                      {
                          arrayFormat: 'bracket',
                      },
                  )}`
                : null,
        [url, query],
    );

    // TODO: test this
    // const pages = [...Array(total).keys()].map((it) => it + 1);

    const page = parseInt(parentPage, 10);
    const total = parseInt(parentTotal, 10);
    const maxPages = parseInt(parentMaxPages, 10);
    const lastPage = parseInt(parentLastPage, 10);

    const pageNumbers = Array.from({ length: parseInt(lastPage, 10) }, (_, i) => i + 1);
    const stripPages = maxPages !== null && lastPage > maxPages;
    const startPage = stripPages
        ? Math.min(Math.max(page - maxPages / 2, 1), lastPage - maxPages)
        : null;
    const endPage = stripPages ? startPage + maxPages : null;
    const strippedPages = stripPages
        ? pageNumbers.reduce((selectedPages, pageNumber) => {
              if (pageNumber === 1 && startPage - 1 > 1) {
                  return [pageNumber, '...'];
              }
              if (pageNumber === lastPage && endPage + 1 < lastPage) {
                  return [...selectedPages, '...', pageNumber];
              }
              return pageNumber >= startPage && pageNumber <= endPage
                  ? [...selectedPages, pageNumber]
                  : selectedPages;
          }, [])
        : pageNumbers;

    const pages = strippedPages.length > 0 ? strippedPages : [1];

    return (
        <nav className={className}>
            <ul className={classNames(['pagination mb-0', paginationClassName])}>
                {withPreviousNext ? (
                    <li
                        className={classNames([
                            'page-item',
                            itemClassName,
                            {
                                disabled: page <= 1,
                            },
                        ])}
                    >
                        {page > 1 ? (
                            <Link
                                className={classNames(['page-link', linkClassName])}
                                href={getUrl(page - 1)}
                                onClick={onClickPage !== null ? () => onClickPage(page - 1) : null}
                            >
                                <FormattedMessage
                                    defaultMessage="Previous"
                                    description="Pagination button label"
                                />
                            </Link>
                        ) : (
                            <span className={classNames(['page-link', linkClassName])}>
                                <FormattedMessage
                                    defaultMessage="Previous"
                                    description="Pagination button label"
                                />
                            </span>
                        )}
                    </li>
                ) : null}

                {pages.map((pageNumber) => (
                    <li
                        key={`page-${pageNumber}`}
                        className={classNames([
                            'page-item',
                            itemClassName,
                            {
                                active: pageNumber === page,
                            },
                        ])}
                    >
                        <Link
                            className={classNames(['page-link', linkClassName])}
                            href={getUrl(pageNumber)}
                            onClick={onClickPage !== null ? () => onClickPage(pageNumber) : null}
                        >
                            {pageNumber}
                        </Link>
                    </li>
                ))}

                {withPreviousNext ? (
                    <li
                        className={classNames([
                            'page-item',
                            itemClassName,
                            {
                                disabled: page >= total,
                            },
                        ])}
                    >
                        {page < total ? (
                            <Link
                                className={classNames(['page-link', linkClassName])}
                                href={getUrl(page + 1)}
                                onClick={onClickPage !== null ? () => onClickPage(page + 1) : null}
                            >
                                <FormattedMessage
                                    defaultMessage="Next"
                                    description="Pagination button label"
                                />
                            </Link>
                        ) : (
                            <span className={classNames(['page-link', linkClassName])}>
                                <FormattedMessage
                                    defaultMessage="Next"
                                    description="Pagination button label"
                                />
                            </span>
                        )}
                    </li>
                ) : null}
            </ul>
        </nav>
    );
}

export default PaginationMenu;
