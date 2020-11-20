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
    asDropdown: PropTypes.bool,
    asList: PropTypes.bool,
    flush: PropTypes.bool,
    dropdownAlign: MicromagPropTypes.dropdownAlign,
    withEditor: PropTypes.bool,
    withDuplicate: PropTypes.bool,
    withDelete: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    linkClassName: null,
    withoutDropdown: false,
    asList: false,
    asDropdown: false,
    flush: false,
    dropdownAlign: null,
    withEditor: false,
    withDuplicate: false,
    withDelete: false,
};

const StoryMenu = ({
    story,
    className,
    itemClassName,
    linkClassName,
    withoutDropdown,
    asList,
    asDropdown,
    flush,
    dropdownAlign,
    withEditor,
    withDuplicate,
    withDelete,
    ...props
}) => {
    const url = useUrlGenerator();
    const { pathname } = useLocation();
    const listItemClassName = asList ? '' : null;

    const finalItems = useMemo(() => {
        const subMenu = [
            {
                id: 'screens',
                href: url('stories.show', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Screens" description="Menu label" />,
                className: listItemClassName,
            },
            {
                id: 'settings',
                href: url('stories.settings', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Settings" description="Menu label" />,
                className: listItemClassName,
            },
            withEditor
                ? {
                      id: 'editor',
                      href: url('stories.editor', {
                          story: story.id,
                      }),
                      label: <FormattedMessage defaultMessage="Editor" description="Menu label" />,
                      className: listItemClassName,
                  }
                : null,
            {
                id: 'preview',
                href: url('stories.preview', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Preview" description="Menu label" />,
                className: listItemClassName,
            },
            {
                id: 'publish',
                href: url('stories.publish', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Publish" description="Menu label" />,
                className: listItemClassName,
            },
            {
                id: 'versions',
                href: url('stories.versions', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Versions" description="Menu label" />,
                className: listItemClassName,
            },
            {
                id: 'medias',
                href: url('stories.medias', {
                    story: story.id,
                }),
                label: <FormattedMessage defaultMessage="Medias" description="Menu label" />,
                className: listItemClassName,
            },
            withDuplicate
                ? {
                      id: 'duplicate',
                      href: url('stories.duplicate', {
                          story: story.id,
                      }),
                      label: (
                          <FormattedMessage defaultMessage="Duplicate" description="Menu label" />
                      ),
                      className: asList ? listItemClassName : null,
                  }
                : null,
            withDelete
                ? {
                      id: 'delete',
                      href: url('stories.delete', {
                          story: story.id,
                      }),
                      label: (
                          <FormattedMessage
                              defaultMessage="Delete story"
                              description="Menu label"
                          />
                      ),
                      className: asList ? `${listItemClassName} list-group-item-danger` : null,
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
                'dropdown-menu': asDropdown,
                'dropdown-menu-right': asDropdown,
                show: asDropdown,
                [className]: className !== null,
            })}
            itemClassName={classNames({
                'list-group-item': asList,
                'list-group-item-action': asList,
                [itemClassName]: itemClassName !== null,
            })}
            linkClassName={classNames({
                'dropdown-item': asDropdown,
                [linkClassName]: linkClassName !== null,
            })}
            dropdownAlign={dropdownAlign}
        />
    );
};

StoryMenu.propTypes = propTypes;
StoryMenu.defaultProps = defaultProps;

export default StoryMenu;
