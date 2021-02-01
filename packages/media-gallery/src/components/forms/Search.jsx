/* eslint-disable no-constant-condition */
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
    onClickIcon: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onClickIcon: null,
    className: null,
};

const Search = ({ value, onChange, onFocus, onBlur, onClickIcon, className }) => {
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

    const onClickSearchIcon = useCallback(() => {
        if (onClickIcon !== null) {
            onClickIcon();
        }
    }, [onClickIcon]);

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
                <span type="span" className="input-group-prepend">
                    <button
                        type="button"
                        className="input-group-text reset-button"
                        onClick={onClickSearchIcon}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
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
                {false ? (
                    <button
                        type="button"
                        className="btn text-dark position-absolute"
                        style={{ right: -2 }}
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
