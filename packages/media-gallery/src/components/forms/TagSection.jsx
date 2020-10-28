import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
                          'btn',
                          'btn-sm',

                          'mb-1',
                          'mr-1',
                          {
                              'btn-primary': active === true,
                              'btn-outline-primary': active === false,
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
