/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Label, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import StoryMenu from '../menus/Story';

import styles from '../../styles/partials/account-box.module.scss';

const messages = defineMessages({
    title: {
        id: 'story-box.title',
        defaultMessage: 'Account',
    },
    screens: {
        id: 'story-box.screens',
        defaultMessage: '{count} {count, plural, one {screen} other {screens}}',
    },
});

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryBox = ({ story, className }) => {
    const { components = [] } = story;
    const url = useUrlGenerator();
    const screensCount = components.length;
    return (
        <Card
            afterBody={<StoryMenu story={story} asList flush />}
            theme="dark"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            bodyClassName={styles.body}
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
                        story: story.id,
                    })}
                    className="text-white"
                >
                    {story.title}
                </Link>
            </h4>
            {screensCount > 0 ? (
                <p className="mb-0 text-muted">
                    <Label values={{ count: screensCount }}>{messages.screens}</Label>
                </p>
            ) : null}
        </Card>
    );
};

StoryBox.propTypes = propTypes;
StoryBox.defaultProps = defaultProps;

export default StoryBox;
