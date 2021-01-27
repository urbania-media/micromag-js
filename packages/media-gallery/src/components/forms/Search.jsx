import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    className: null,
};

const Search = ({ value, onChange, onFocus, onBlur, className }) => {
    const intl = useIntl();
    const onSearchChange = useCallback(
        (e) => {
            const newValue = e.currentTarget.value.length > 0 ? e.currentTarget.value : null;
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const onSearchClear = useCallback(() => {
        if (onChange !== null) {
            onChange('');
        }
    }, [onChange]);

    return (
        <form
            method="post"
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="input-group">
                <span className="input-group-prepend">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </span>
                <input
                    className={classNames([
                        'form-control',
                        {
                            'bg-light': !!value,
                            'text-dark': value,
                        },
                    ])}
                    type="text"
                    value={value || ''}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Search...',
                        description: 'Input placeholder',
                    })}
                    onChange={onSearchChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {value ? (
                    <button
                        type="button"
                        className="btn text-dark position-absolute"
                        style={{ right: 0 }}
                        onClick={onSearchClear}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                ) : null}
            </div>
        </form>
    );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
