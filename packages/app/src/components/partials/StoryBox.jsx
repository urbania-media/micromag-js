/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import StoryMenu from '../menus/Story';
import ScreensCount from './ScreensCount';

import styles from '../../styles/partials/account-box.module.scss';

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
                    <ScreensCount count={screensCount} />
                </p>
            ) : null}
        </Card>
    );
};

StoryBox.propTypes = propTypes;
StoryBox.defaultProps = defaultProps;

export default StoryBox;
