import classNames from 'classnames';
import React, { useCallback } from 'react';

import styles from '../../styles/forms/tag-dropdown.module.css';

interface TagDropdownProps {
    tags?: { label?: string; value?: unknown; active?: boolean }[];
    parent?: string;
    onChange?: (...args: unknown[]) => void;
    className?: string;
}

function TagDropdown({ tags = null, parent = null, onChange = null, className = null }) {
    const onItemChange = useCallback(
        (e) => {
            const val = e.target.dataset.value || null;
            onChange(val, parent);
        },
        [onChange, parent],
    );
    return (
        <div
            className={classNames([
                styles.container,
                'd-flex',
                'mt-1',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <select className={classNames(['form-select', styles.select])}>
                {tags !== null
                    ? tags.map(({ label, value, active }) => {
                          const itemClassNames = classNames([
                              styles.tag,
                              'fs-6',
                              {
                                  'btn-primary': active === true,
                              },
                          ]);
                          return (
                              <option
                                  className={itemClassNames}
                                  type="button"
                                  key={`option-${value}`}
                                  onClick={onItemChange}
                                  data-value={value}
                                  value={value}
                              >
                                  {label}
                              </option>
                          );
                      })
                    : null}
            </select>
        </div>
    );
}

export default TagDropdown;
