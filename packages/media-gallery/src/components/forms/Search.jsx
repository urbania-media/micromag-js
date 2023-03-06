/* eslint-disable no-constant-condition */
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import styles from '../../styles/forms/search.module.scss';

const propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClickIcon: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    loading: false,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onClickIcon: null,
    className: null,
};

const Search = ({ value, loading, onChange, onFocus, onBlur, onClickIcon, className }) => {
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
                styles.container,
                'w-100',
                'border',
                'border-dark',
                'rounded',
                {
                    [className]: className !== null,
                },
            ])}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="input-group w-100">
                <button type="button" className="btn" onClick={onClickSearchIcon}>
                    <FontAwesomeIcon icon={loading ? faSpinner : faSearch} spin={loading} />
                </button>
                <input
                    className={classNames([
                        styles.input,
                        'form-control',
                        {
                            'bg-light': !!value,
                            'text-dark': value,
                        },
                    ])}
                    type="text"
                    value={value || ''}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Search medias',
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
