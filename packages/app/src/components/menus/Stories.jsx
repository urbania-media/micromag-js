/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from '@micromag/core/components';
import { defineMessages } from 'react-intl';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/menus/stories.module.scss';

const messages = defineMessages({
    stories: {
        id: 'menus.stories.stories',
        defaultMessage: 'Stories',
    },
    viewAll: {
        id: 'menus.stories.view_all',
        defaultMessage: 'View all stories',
    },
    create: {
        id: 'menus.stories.create',
        defaultMessage: 'Create a new story',
    },
    recent: {
        id: 'menus.stories.recent',
        defaultMessage: 'Recent stories',
    },
});

const propTypes = {
    items: AppPropTypes.organisations,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
    itemClassName: null,
    linkClassName: null,
};

const StoriesMenu = ({ items, className, itemClassName, linkClassName, ...props }) => {
    const url = useUrlGenerator();
    return (
        <Menu
            {...props}
            items={[
                {
                    id: 'stories',
                    href: url('stories'),
                    label: messages.stories,
                    dropdown: [
                        {
                            href: url('stories.create'),
                            label: messages.create,
                        },
                        {
                            href: url('stories'),
                            label: messages.viewAll,
                        },
                        {
                            type: 'divider',
                        },
                        {
                            type: 'header',
                            label: messages.recent,
                        },
                    ],
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

StoriesMenu.propTypes = propTypes;
StoriesMenu.defaultProps = defaultProps;

export default StoriesMenu;
