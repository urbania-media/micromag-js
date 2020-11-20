import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { Screens } from '@micromag/editor';
import SettingsButton from '../buttons/Settings';
import StoryMenu from '../menus/Story';
// import Authors from '../partials/Authors';

import styles from '../../styles/items/story.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryItem = ({ item, className }) => {
    const url = useUrlGenerator();
    const { components: screens = [] } = item;
    const screensCount = screens.length;
    const screen =
        screensCount > 0
            ? screens[0]
            : {
                  id: null,
                  type: null,
              };
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Screens
                items={[
                    {
                        screen,
                        href: url('stories.show', {
                            story: item.id,
                        }),
                    },
                ]}
                withPreview
                itemClassName={styles.preview}
                buttonClassName={styles.button}
            />
            <h4 className={classNames(['card-title', styles.title])}>
                <Link
                    to={url('stories.show', {
                        story: item.id,
                    })}
                    className="text-white"
                >
                    {item.title}
                </Link>
            </h4>
            <div className={styles.settings}>
                <SettingsButton theme="secondary" outline>
                    <StoryMenu
                        className={styles.menu}
                        story={item}
                        asDropdown
                        withoutDropdown
                        withDuplicate
                        withDelete
                    />
                </SettingsButton>
            </div>
        </div>
    );
};

StoryItem.defaultProps = defaultProps;
StoryItem.propTypes = propTypes;

export default StoryItem;
