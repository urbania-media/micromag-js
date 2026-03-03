import classNames from 'classnames';
import Fuse from 'fuse.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import TextField from './Text';

import styles from '../styles/autocomplete.module.css';

interface AutocompleteFieldProps {
    items?: { label?: string; value?: number | string }[];
    value?: string | null;
    searchOptions?: {
        isCaseSensitive?: boolean;
        includeScore?: boolean;
        includeMatches?: boolean;
        minMatchCharLength?: number;
        shouldSort?: boolean;
        threshold?: number;
        distance?: number;
    };
    maxResults?: number;
    showEmpty?: boolean;
    placeholder?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
    children?: React.ReactNode | null;
}

function AutocompleteField({
    items = [],
    value = null,

    searchOptions = {
        // Search in `label` and in `value` items in an object array
        keys: ['label', 'value'],
    },

    maxResults = 10,
    showEmpty = false,
    placeholder = null,
    className = null,
    onChange = null,
    children = null,
}: AutocompleteFieldProps) {
    const fuse = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const options = {
            isCaseSensitive: false,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            shouldSort: true,
            ...searchOptions,
        };
        fuse.current = new Fuse(items, options);
    }, [items, searchOptions]);

    const list =
        value && fuse.current !== null
            ? fuse.current.search(value)
            : items.map((item) => ({
                  item,
              }));

    const maxedList = maxResults > 0 ? list.slice(0, maxResults) : list;

    const onClick = useCallback(
        (e) => {
            if (e.target.dataset.value) {
                onChange(e.target.dataset.value);
                setOpen(false);
            }
        },
        [onChange],
    );

    const onInputChange = useCallback(
        (val) => {
            onChange(val);
            if (val) {
                setOpen(true);
            } else {
                setOpen(showEmpty);
            }
        },
        [onChange, showEmpty],
    );

    const listItems =
        children !== null ? (
            <div className={styles.list}>{children}</div>
        ) : (
            <div className={styles.list}>
                <ul className="list-group bg-light">
                    {maxedList.map(({ item }) => (
                        <li
                            className={classNames(['list-group-item', styles.item])}
                            key={`auto-${item.label}`}
                        >
                            <button
                                type="button"
                                className="btn btn-link"
                                data-value={item.label}
                                onClick={onClick}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <TextField
                value={value}
                buttonClassName={styles.button}
                placeholder={placeholder}
                onChange={onInputChange}
            />
            {open ? listItems : null}
        </div>
    );
}

export default AutocompleteField;
