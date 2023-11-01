/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useCallback } from 'react';
import { defineMessages } from 'react-intl';

import Label from '../partials/Label';
// import { PropTypes as MicromagPropTypes } from '../../lib';
import Link from '../partials/Link';

import styles from '../../styles/menus/pagination.module.scss';

const messages = defineMessages({
    previous: {
        id: 'menus.pagination.previous',
        defaultMessage: 'Previous',
    },
    next: {
        id: 'menus.pagination.next',
        defaultMessage: 'next',
    },
});

const propTypes = {
    page: PropTypes.number,
    lastPage: PropTypes.number,
    maxPages: PropTypes.number,
    total: PropTypes.number,
    url: PropTypes.string,
    query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    withPreviousNext: PropTypes.bool,
    className: PropTypes.string,
    paginationClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    onClickPage: PropTypes.func,
};

const defaultProps = {
    page: 1,
    lastPage: 1,
    maxPages: 10,
    total: 1,
    url: null,
    query: null,
    withPreviousNext: false,
    className: null,
    paginationClassName: null,
    itemClassName: null,
    linkClassName: null,
    onClickPage: null,
};

const PaginationMenu = ({
    page: parentPage,
    lastPage: parentLastPage,
    maxPages: parentMaxPages,
    total: parentTotal,
    url,
    query,
    withPreviousNext,
    className,
    paginationClassName,
    itemClassName,
    linkClassName,
    onClickPage,
}) => {
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
        <nav
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <ul
                className={classNames([
                    'pagination',
                    {
                        [paginationClassName]: paginationClassName !== null,
                    },
                ])}
            >
                {withPreviousNext ? (
                    <li
                        className={classNames([
                            'page-item',
                            {
                                disabled: page <= 1,
                                [itemClassName]: itemClassName !== null,
                            },
                        ])}
                    >
                        {page > 1 ? (
                            <Link
                                className={classNames([
                                    'page-link',
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                                href={getUrl(page - 1)}
                                onClick={onClickPage !== null ? () => onClickPage(page - 1) : null}
                            >
                                {messages.previous}
                            </Link>
                        ) : (
                            <span
                                className={classNames([
                                    'page-link',
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                            >
                                <Label>{messages.previous}</Label>
                            </span>
                        )}
                    </li>
                ) : null}

                {pages.map((pageNumber) => (
                    <li
                        key={`page-${pageNumber}`}
                        className={classNames([
                            'page-item',
                            {
                                active: pageNumber === page,
                                [itemClassName]: itemClassName !== null,
                            },
                        ])}
                    >
                        <Link
                            className={classNames([
                                'page-link',
                                {
                                    [linkClassName]: linkClassName !== null,
                                },
                            ])}
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
                            {
                                disabled: page >= total,
                                [itemClassName]: itemClassName !== null,
                            },
                        ])}
                    >
                        {page < total ? (
                            <Link
                                className={classNames([
                                    'page-link',
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                                href={getUrl(page + 1)}
                                onClick={onClickPage !== null ? () => onClickPage(page + 1) : null}
                            >
                                {messages.next}
                            </Link>
                        ) : (
                            <span
                                className={classNames([
                                    'page-link',
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                            >
                                <Label>{messages.next}</Label>
                            </span>
                        )}
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

PaginationMenu.propTypes = propTypes;
PaginationMenu.defaultProps = defaultProps;

export default PaginationMenu;
