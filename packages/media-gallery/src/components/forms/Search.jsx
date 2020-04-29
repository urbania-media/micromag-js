import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { injectIntl, defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

const messages = defineMessages({
    placeholder: {
        id: 'forms.search_placeholder',
        defaultMessage: 'Search...',
    },
});

const propTypes = {
    intl: MicromagPropTypes.intl,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    intl: null,
    value: null,
    onChange: null,
    onFocus: null,
    className: null,
};

const Search = ({ intl, value, onChange, onFocus, className }) => {
    const onSearchChange = useCallback(
        e => {
            const newValue = e.currentTarget.value.length > 0 ? e.currentTarget.value : null;
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    return (
        <form method="post" className={className}>
            <div className="input-group">
                <span className="input-group-prepend">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </span>
                <input
                    className="form-control"
                    type="text"
                    value={value || ''}
                    placeholder={intl.formatMessage(messages.placeholder)}
                    onChange={onSearchChange}
                    onFocus={onFocus}
                />
            </div>
        </form>
    );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default injectIntl(Search);
