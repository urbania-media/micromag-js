import classNames from 'classnames';
import React, { useCallback } from 'react';

import styles from '../../styles/forms/tag-section.module.css';

interface TagSectionProps {
    tags?: { label?: string; value?: unknown; active?: boolean }[];
    parent?: string;
    onChange?: (...args: unknown[]) => void;
    className?: string;
}

const TagSection = ({ tags = null, parent = null, onChange = null, className = null }) => {
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
            {tags !== null
                ? tags.map(({ label, value, active }) => {
                      const itemClassNames = classNames([
                          styles.tag,
                          'btn',
                          'btn-sm',
                          'mb-1',
                          'me-1',
                          'p-1',
                          'btn-secondary',
                          'text-truncate',
                          {
                              'btn-primary': active === true,
                              // 'btn-outline-light': active === false,
                          },
                      ]);
                      return (
                          <button
                              className={itemClassNames}
                              type="button"
                              key={`tag-${value}`}
                              onClick={onItemChange}
                              data-value={value}
                          >
                              {label}
                          </button>
                      );
                  })
                : null}
        </div>
    );
};

export default TagSection;
