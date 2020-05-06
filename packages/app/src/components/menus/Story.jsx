/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

const messages = defineMessages({
    editor: {
        id: 'menus.story.editor',
        defaultMessage: 'Launch editor',
    },
    preview: {
        id: 'menus.story.preview',
        defaultMessage: 'Preview',
    },
    settings: {
        id: 'menus.story.settings',
        defaultMessage: 'Settings',
    },
    publish: {
        id: 'menus.story.publish',
        defaultMessage: 'Publish',
    },
    delete: {
        id: 'menus.story.delete',
        defaultMessage: 'Delete story',
    },
});

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    withoutDropdown: PropTypes.bool,
    asList: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
    withDelete: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    asList: false,
    flush: false,
    dropdownAlign: null,
    withDelete: false,
};

const StoryMenu = ({
    story,
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    asList,
    flush,
    dropdownAlign,
    withDelete,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const finalItems = useMemo(() => {
        const subMenu = [
            {
                id: 'editor',
                href: url('stories.editor', {
                    story: story.id,
                }),
                label: messages.editor,
                className: asList ? 'list-group-item-dark' : null,
            },
            {
                id: 'preview',
                href: url('stories.preview', {
                    story: story.id,
                }),
                label: messages.preview,
                className: asList ? 'list-group-item-dark' : null,
            },
            {
                id: 'publish',
                href: url('stories.publish', {
                    story: story.id,
                }),
                label: messages.publish,
                className: asList ? 'list-group-item-dark' : null,
            },
            {
                id: 'settings',
                href: url('stories.settings', {
                    story: story.id,
                }),
                label: messages.settings,
                className: asList ? 'list-group-item-dark' : null,
            },
            withDelete
                ? {
                      id: 'delete',
                      href: url('stories.delete', {
                          story: story.id,
                      }),
                      label: messages.delete,
                      className: asList ? 'list-group-item-danger' : null,
                  }
                : null,
        ]
            .filter(it => it !== null)
            .map(it =>
                it.href === pathname
                    ? {
                          ...it,
                          active: true,
                      }
                    : it,
            );
        return withoutDropdown || asList
            ? subMenu
            : [
                  {
                      id: 'story',
                      href: url('stories.show', {
                          story: story.id,
                      }),
                      label: story.title,
                      dropdown: subMenu,
                  },
              ];
    }, [story, url, messages, withoutDropdown, withDelete, asList]);
    return (
        <Menu
            {...props}
            items={finalItems}
            linkAsItem={asList}
            className={classNames({
                'list-group': asList,
                'list-group-flush': asList && flush,
                [className]: className !== null,
            })}
            itemClassName={classNames({
                'list-group-item': asList,
                'list-group-item-action': asList,
                [itemClassName]: itemClassName !== null,
            })}
            linkClassName={linkClassName}
            dropdownAlign={dropdownAlign}
        />
    );
};

StoryMenu.propTypes = propTypes;
StoryMenu.defaultProps = defaultProps;

export default StoryMenu;
