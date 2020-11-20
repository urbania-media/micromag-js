/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import styles from '../../styles/menus/main-guest.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const MainGuestMenu = ({ className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'login',
                    href: url('auth.login'),
                    label: <FormattedMessage defaultMessage="Login" description="Menu item" />,
                    active: pathname === url('auth.login'),
                },
                {
                    id: 'register',
                    href: url('register'),
                    label: <FormattedMessage defaultMessage="Register" description="Menu item" />,
                    active: pathname === url('register'),
                },
            ]}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            itemClassName={itemClassName}
            linkClassName={linkClassName}
        />
    );
};

MainGuestMenu.propTypes = propTypes;
MainGuestMenu.defaultProps = defaultProps;

export default MainGuestMenu;
