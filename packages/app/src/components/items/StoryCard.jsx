/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Link, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryDuplicate, useStoryDelete } from '@micromag/data';

import ScreensCount from '../partials/ScreensCount';
import SettingsButton from '../buttons/Settings';

import styles from '../../styles/items/story-card.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryCardItem = ({ item, className }) => {
    const intl = useIntl();
    const url = useUrlGenerator();

    const { components = [] } = item;
    const screensCount = components.length;

    const { duplicate: duplicateStory } = useStoryDuplicate(item.id);
    const { deleteStory } = useStoryDelete(item.id);

    const postDuplicate = useCallback((data) => duplicateStory(data), [duplicateStory]);
    const postDelete = useCallback(() => {
        deleteStory();
    }, [deleteStory]);

    const onClickDuplicate = useCallback(() => {
        postDuplicate(item);
    }, [intl, item, postDuplicate]);

    const onClickDelete = useCallback(() => {
        postDelete();
    }, [postDelete]);

    return (
        <Card
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            theme="dark"
            beforeBody={
                <div className={styles.settings}>
                    <SettingsButton className={styles.button}>
                        <ul className="list-group text-dark">
                            <li className="list-group-item">
                                <Link
                                    href={url('stories.editor', {
                                        story: item.id,
                                    })}
                                    className="card-link"
                                >
                                    <FormattedMessage
                                        defaultMessage="Edit"
                                        description="Edit button label"
                                    />
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link
                                    href={url('stories.settings', {
                                        story: item.id,
                                    })}
                                    className="card-link"
                                >
                                    <FormattedMessage
                                        defaultMessage="Settings"
                                        description="Settings button label"
                                    />
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Button asLink onClick={onClickDuplicate}>
                                    <FormattedMessage
                                        defaultMessage="Duplicate"
                                        description="Duplicate button label"
                                    />
                                </Button>
                            </li>
                            <li className="list-group-item">
                                <Button asLink onClick={onClickDelete}>
                                    <FormattedMessage
                                        defaultMessage="Delete"
                                        description="Delete button label"
                                    />
                                </Button>
                            </li>
                        </ul>
                    </SettingsButton>
                </div>
            }
            footer={
                <>
                    <FormattedMessage
                        defaultMessage="Members: "
                        description="Members button label"
                    />
                </>
            }
        >
            <h4
                className={classNames([
                    'card-title',
                    {
                        'mb-0': screensCount === 0,
                    },
                ])}
            >
                <Link
                    to={url('stories.editor', {
                        story: item.id,
                    })}
                    className="text-white"
                >
                    {item.title}
                </Link>
            </h4>
            {screensCount > 0 ? (
                <p className="text-muted mb-0">
                    <ScreensCount count={screensCount} />
                </p>
            ) : null}
        </Card>
    );
};

StoryCardItem.defaultProps = defaultProps;
StoryCardItem.propTypes = propTypes;

export default StoryCardItem;
