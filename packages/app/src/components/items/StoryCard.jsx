/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import ScreensCount from '../partials/ScreensCount';

import styles from '../../styles/items/story-card.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryCardItem = ({ item, className }) => {
    const url = useUrlGenerator();
    const { components = [] } = item;
    const screensCount = components.length;
    return (
        <Card
            theme="dark"
            footer={
                <>
                    <Link
                        href={url('stories.editor', {
                            story: item.id,
                        })}
                        className="card-link text-white"
                    >
                        <FormattedMessage defaultMessage="Edit" description="Button label" />
                    </Link>
                    <Link
                        href={url('stories.settings', {
                            story: item.id,
                        })}
                        className="card-link text-white"
                    >
                        <FormattedMessage defaultMessage="Settings" description="Button label" />
                    </Link>
                </>
            }
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
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
                    to={url('stories.show', {
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

StoryCardItem.propTypes = propTypes;
StoryCardItem.defaultProps = defaultProps;

export default StoryCardItem;
