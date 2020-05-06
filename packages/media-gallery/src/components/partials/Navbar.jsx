import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import SearchForm from '../forms/Search';

const messages = defineMessages({
    addButton: {
        id: 'buttons.add',
        defaultMessage: 'Add',
    },
});

const propTypes = {
    filters: AppPropTypes.filtersValue,
    media: MicromagPropTypes.media,
    className: PropTypes.string,
    onClickAdd: PropTypes.func,
    onFocusSearch: PropTypes.func,
    onFiltersChange: PropTypes.func,
    onClickBack: PropTypes.func,
};

const defaultProps = {
    filters: null,
    media: null,
    className: null,
    onClickAdd: null,
    onFocusSearch: null,
    onFiltersChange: null,
    onClickBack: null,
};

const Navbar = ({
    filters,
    media,
    className,
    onClickAdd,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
    const onSearchChange = useCallback(
        newSearchValue => {
            const newFiltersValue = {
                ...filters,
                search: newSearchValue,
            };
            if (onFiltersChange !== null) {
                onFiltersChange(newFiltersValue);
            }
        },
        [filters, onFiltersChange],
    );
    const searchValue = filters !== null ? filters.search || null : null;
    return (
        <nav
            className={classNames([
                'navbar',
                'navbar-light',
                'bg-light',
                'flex-nowrap',
                'px-2',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {media !== null ? (
                <>
                    <form className={classNames(['form-inline'])}>
                        <Button
                            theme="secondary"
                            outline
                            icon={<FontAwesomeIcon icon={faChevronLeft} />}
                            onClick={onClickBack}
                        />
                    </form>
                    <strong className="navbar-text ml-2 mr-auto">{media.name}</strong>
                </>
            ) : (
                <>
                    <SearchForm
                        value={searchValue}
                        onChange={onSearchChange}
                        onFocus={onFocusSearch}
                        className={classNames(['form-inline', 'mr-2'])}
                    />
                    <form className={classNames(['form-inline', 'ml-auto'])}>
                        <Button
                            theme="primary"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={onClickAdd}
                        >
                            {messages.addButton}
                        </Button>
                    </form>
                </>
            )}
        </nav>
    );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
