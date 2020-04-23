/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';

import { useUrlGenerator } from '../../contexts/RoutesContext';

import styles from '../../styles/menus/main.module.scss';

const messages = defineMessages({
    account: {
        id: 'menus.main.account',
        defaultMessage: 'Account',
    },
});

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

const MainMenu = ({ className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'account',
                    href: url('account'),
                    label: messages.account,
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

MainMenu.propTypes = propTypes;
MainMenu.defaultProps = defaultProps;

export default MainMenu;
