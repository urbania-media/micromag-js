/* eslint-disable arrow-body-style */

/* eslint-disable react/jsx-props-no-spreading */
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@micromag/core/components';

import TagDropdown from './TagDropdown';
import TagSection from './TagSection';

import styles from '../../styles/forms/search-filters.module.css';

const emptyArray: never[] = [];

interface SearchFiltersProps {
    filters?: Record<string, unknown>;
    sections?: Record<string, unknown>[];
    onChange?: (...args: unknown[]) => void;
    onClose?: (...args: unknown[]) => void;
    className?: string;
}

function SearchFilters({
    filters = null,
    sections = emptyArray,
    onChange = null,
    onClose = null,
    className = null,
}: SearchFiltersProps) {
    const intl = useIntl();
    const getActive = useCallback((items, sectionFilters) => {
        return items !== null
            ? items.map((it) => ({
                  ...it,
                  active: sectionFilters ? !!sectionFilters.find((f) => f === it.value) : false,
              }))
            : [];
    }, []);

    const activeSections = useMemo(() => {
        return sections.map((section) => ({
            ...section,
            items: getActive(section.items, filters[section.value]),
        }));
    }, [getActive, sections, filters]);

    const onSectionChange = useCallback(
        (data, section) => {
            const val = filters[section] ? filters[section] : [];
            const found = !!val.find((f) => f === data);
            if (found) {
                onChange(
                    section,
                    val.filter((f) => f !== data),
                );
            } else if (data) {
                if (section === 'recent') {
                    onChange('search', data);
                } else if (section === 'usage') {
                    onChange(section, [data]);
                } else {
                    onChange(section, [...val, data]);
                }
            }
        },
        [filters, onChange],
    );

    return (
        <div className={classNames([styles.container, 'flex-nowrap', 'mt-1', className])}>
            {activeSections.length > 0 ? (
                <div className={classNames(['flex-nowrap', 'py-1', 'px-3', 'rounded'])}>
                    <Button
                        className={classNames([styles.closeBtn, 'py-1', 'px-1'])}
                        icon={<FontAwesomeIcon icon={faTimes} />}
                        onClick={onClose}
                        title={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Close button label in Media Gallery',
                        })}
                    />
                    {activeSections.map(({ value, label, items }) => {
                        return items.length > 0 ? (
                            <div
                                key={`filter-${value}`}
                                className={classNames([styles.section, 'py-2'])}
                            >
                                <p className={classNames([styles.title, 'm-0'])}>{label}</p>
                                {value === 'tags' || value === 'recent' || value === 'users' ? (
                                    <TagDropdown
                                        className={classNames([styles.tags])}
                                        tags={items}
                                        parent={value}
                                        onChange={onSectionChange}
                                    />
                                ) : (
                                    <TagSection
                                        className={classNames([styles.tags])}
                                        tags={items}
                                        parent={value}
                                        onChange={onSectionChange}
                                    />
                                )}
                            </div>
                        ) : null;
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default SearchFilters;
