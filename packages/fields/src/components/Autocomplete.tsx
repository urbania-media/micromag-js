import classNames from 'classnames';
import Fuse from 'fuse.js';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import TextField from './Text';

const emptyArray: never[] = [];

const defaultSearchOptions = {
    keys: ['label', 'value'],
};

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
    children?: ReactNode | null;
}

function AutocompleteField({
    items = emptyArray,
    value = null,
    searchOptions = defaultSearchOptions,
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

    return (
        <div className={classNames(['dropdown', className])}>
            <TextField value={value} placeholder={placeholder} onChange={onInputChange} />
            {children !== null ? (
                <div className="position-absolute mt-2">{children}</div>
            ) : (
                <ul
                    className={classNames([
                        'dropdown-menu mt-2',
                        { show: open && maxedList.length > 0 },
                    ])}
                >
                    {maxedList.map(({ item }) => (
                        <li key={`auto-${item.label}`}>
                            <button
                                type="button"
                                className="dropdown-item"
                                data-value={item.label}
                                onClick={onClick}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AutocompleteField;
