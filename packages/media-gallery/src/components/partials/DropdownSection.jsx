import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import styles from '../../styles/partials/dropdown-section.module.scss';

const propTypes = {
    value: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
            active: PropTypes.bool,
        }),
    ),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    items: null,
    onChange: null,
    className: null,
};

const DropdownSection = ({ value, items, onChange, className }) => {
    const [open, setOpen] = useState(false);
    const currentItem = items.find((i) => i.value === value);

    const onOpen = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    const onBlur = useCallback(() => {
        // Work around the event call order
        setTimeout(() => {
            setOpen(false);
        }, 300);
    }, [setOpen]);

    const onItemClick = useCallback(
        (e) => {
            const val = e.target.dataset.value || null;
            setOpen(false);
            onChange(val);
        },
        [setOpen],
    );

    return (
        <div
            className={classNames([
                styles.container,
                'dropdown',
                'text-dark',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <span className={styles.label}>
                <FormattedMessage defaultMessage="Library for " description="Library source menu" />
            </span>
            <button
                className={classNames([
                    styles.dropdownToggle,
                    'dropdown-toggle',
                    {
                        open: open === true,
                    },
                ])}
                type="button"
                onClick={onOpen}
                onBlur={onBlur}
            >
                {(currentItem ? currentItem.label : null) || (
                    <FormattedMessage
                        defaultMessage="All"
                        description="Dropdown default all items label"
                    />
                )}
            </button>
            <div
                className={classNames([
                    styles.dropdown,
                    'dropdown-menu',
                    {
                        show: open === true,
                    },
                ])}
            >
                {items !== null
                    ? items.map(({ label, value: itemValue }) => {
                          const itemClassNames = classNames([
                              'dropdown-item',
                              {
                                  active: itemValue === value,
                              },
                          ]);

                          return (
                              <button
                                  className={itemClassNames}
                                  type="button"
                                  key={`drop-${itemValue}`}
                                  onClick={onItemClick}
                                  data-value={itemValue}
                              >
                                  {label}
                              </button>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

DropdownSection.propTypes = propTypes;
DropdownSection.defaultProps = defaultProps;

export default DropdownSection;
