import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import styles from '../../styles/forms/tag-section.module.scss';

const propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
            active: PropTypes.bool,
        }),
    ),
    parent: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    tags: null,
    parent: null,
    onChange: null,
    className: null,
};

const TagSection = ({ tags, parent, onChange, className }) => {
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
                          'btn-dark',
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

TagSection.propTypes = propTypes;
TagSection.defaultProps = defaultProps;

export default TagSection;
