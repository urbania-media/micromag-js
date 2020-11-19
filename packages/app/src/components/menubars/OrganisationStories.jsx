import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import AddButton from '../buttons/Add';

const propTypes = {
    userCount: PropTypes.number,
    allCount: PropTypes.number,
    filters: PropTypes.object, // eslint-disable-line
    onFilterChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    userCount: 0,
    allCount: 0,
    filters: null,
    onFilterChange: null,
    className: null,
};

const OrganisationStoriesMenubar = ({
    userCount,
    allCount,
    filters,
    onFilterChange,
    className,
}) => {
    const url = useUrlGenerator();
    const onClickMyStories = useCallback(() => {
        if (onFilterChange !== null) {
            onFilterChange({ user: 'self' });
        }
    }, [onFilterChange]);
    const onClickAllStories = useCallback(() => {
        if (onFilterChange !== null) {
            onFilterChange({ user: null });
        }
    }, [onFilterChange]);

    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                'justify-content-between',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="btn-group" role="group" aria-label="Basic example">
                <Button
                    type="button"
                    className={classNames([
                        'btn',
                        'btn-primary',
                        {
                            'btn-secondary': !filters || filters.user === null,
                        },
                    ])}
                    onClick={onClickMyStories}
                >
                    <FormattedMessage
                        defaultMessage="My stories"
                        description="My stories button label"
                    />
                    <span className="d-inline-block font-weight-light ml-1">{userCount}</span>
                </Button>
                <Button
                    type="button"
                    className={classNames([
                        'btn',
                        'btn-primary',
                        {
                            'btn-secondary': filters && filters.user !== null,
                        },
                    ])}
                    onClick={onClickAllStories}
                >
                    <FormattedMessage defaultMessage="All" description="All button label" />
                    <span className="d-inline-block font-weight-light ml-1">{allCount}</span>
                </Button>
            </div>
            <AddButton href={url('stories.create')}>
                <FormattedMessage defaultMessage="New story" description="New story button label" />
            </AddButton>
        </div>
    );
};

OrganisationStoriesMenubar.propTypes = propTypes;
OrganisationStoriesMenubar.defaultProps = defaultProps;

export default OrganisationStoriesMenubar;
