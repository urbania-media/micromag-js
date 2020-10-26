import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    title: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
            active: PropTypes.bool,
        }),
    ),
    onClick: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    tags: null,
    onClick: null,
    className: null,
};

const TagSection = ({ title, tags, onClick, className }) => {
    return (
        <div
            className={classNames([
                'd-flex',
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
                          'm-1',
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
                              onClick={() => {
                                  onClick(value);
                              }}
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
