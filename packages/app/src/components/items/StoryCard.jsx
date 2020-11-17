import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import ScreensCount from '../partials/ScreensCount';
import Authors from '../partials/Authors';
import SettingsButton from '../buttons/Settings';
import StoryMenu from '../menus/Story';

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
                        <StoryMenu story={item} asList withDuplicate withDelete />
                    </SettingsButton>
                </div>
            }
            footer={<Authors />}
        >
            <h4
                className={classNames([
                    'card-title',
                    'mr-4',
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
