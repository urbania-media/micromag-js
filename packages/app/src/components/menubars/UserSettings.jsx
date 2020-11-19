import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SettingsButton from '../buttons/Settings';
import AccountMenu from '../menus/Account';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const UserSettingsMenubar = ({ className }) => {
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                'justify-content-end',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <SettingsButton>
                <AccountMenu asDropdown withoutDropdown />
            </SettingsButton>
        </div>
    );
};

UserSettingsMenubar.propTypes = propTypes;
UserSettingsMenubar.defaultProps = defaultProps;

export default UserSettingsMenubar;
