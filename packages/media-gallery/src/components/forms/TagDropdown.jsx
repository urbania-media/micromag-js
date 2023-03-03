import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import styles from '../../styles/forms/tag-dropdown.module.scss';

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

const TagDropdown = ({ tags, parent, onChange, className }) => {
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
};

TagDropdown.propTypes = propTypes;
TagDropdown.defaultProps = defaultProps;

export default TagDropdown;
