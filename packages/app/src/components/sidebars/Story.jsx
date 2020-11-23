/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';

import StoryMenu from '../menus/Story';
import ScreensCount from '../partials/ScreensCount';

import styles from '../../styles/partials/account-box.module.scss';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryBox = ({ story, className }) => {
    const { components = [], title = null } = story;
    const screensCount = components.length;
    return (
        <Card
            afterBody={<StoryMenu story={story} asList flush withScreens />}
            theme="dark"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            bodyClassName={styles.body}
        >
            {title ? (
                <>
                    <h5>{title}</h5>
                    {screensCount > 0 ? (
                        <p className="mb-0 text-muted">
                            <ScreensCount count={screensCount} />
                        </p>
                    ) : null}
                </>
            ) : null}
        </Card>
    );
};

StoryBox.propTypes = propTypes;
StoryBox.defaultProps = defaultProps;

export default StoryBox;
