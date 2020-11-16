/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Menu } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    withoutDropdown: PropTypes.bool,
    asList: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
    withEditor: PropTypes.bool,
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
    withEditor: true,
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
    withEditor,
    withDelete,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const listItemClassName = asList ? '' : null;

    const finalItems = useMemo(() => {
        const subMenu = [
            withEditor
                ? {
                      id: 'editor',
                      href: url('stories.editor', {
                          story: story.id,
                      }),
                      label: (
                          <FormattedMessage
                              defaultMessage="Editor"
                              description="Editor menu label"
                          />
                      ),
                      className: listItemClassName,
                  }
                : null,
            {
                id: 'preview',
                href: url('stories.preview', {
                    story: story.id,
                }),
                label: (
                    <FormattedMessage defaultMessage="Preview" description="Preview menu label" />
                ),
                className: listItemClassName,
            },
            {
                id: 'publish',
                href: url('stories.publish', {
                    story: story.id,
                }),
                label: (
                    <FormattedMessage defaultMessage="Publish" description="Publish menu label" />
                ),
                className: listItemClassName,
            },
            {
                id: 'versions',
                href: url('stories.versions', {
                    story: story.id,
                }),
                label: (
                    <FormattedMessage defaultMessage="Versions" description="Versions menu label" />
                ),
                className: listItemClassName,
            },
            {
                id: 'settings',
                href: url('stories.settings', {
                    story: story.id,
                }),
                label: (
                    <FormattedMessage defaultMessage="Settings" description="Settings menu label" />
                ),
                className: listItemClassName,
            },
            withDelete
                ? {
                      id: 'delete',
                      href: url('stories.delete', {
                          story: story.id,
                      }),
                      label: (
                          <FormattedMessage
                              defaultMessage="Delete story"
                              description="Delete story menu label"
                          />
                      ),
                      className: asList ? 'list-group-item-danger' : null,
                  }
                : null,
        ]
            .filter((it) => it !== null)
            .map((it) =>
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
    }, [story, url, withoutDropdown, withDelete, asList]);
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
