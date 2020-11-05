import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { useUrlGenerator } from '@micromag/core/contexts';

import AddButton from '../buttons/Add';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const UserStoriesMenubar = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-end',
                'justify-content-end',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <AddButton href={url('stories.create')}>
                <FormattedMessage defaultMessage="New story" description="New story button label" />
            </AddButton>
        </div>
    );
};

UserStoriesMenubar.propTypes = propTypes;
UserStoriesMenubar.defaultProps = defaultProps;

export default UserStoriesMenubar;
