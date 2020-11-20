import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { Screens } from '@micromag/editor';

import styles from '../../styles/items/theme.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ThemeItem = ({ item, className }) => {
    const url = useUrlGenerator();
    const { id = null, title = null, components: screens = [] } = item || {};
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
                        href: url('themes.show', {
                            theme: id,
                        }),
                    },
                ]}
                withPreview
                itemClassName={styles.preview}
                buttonClassName={styles.button}
            />
            <h4 className={classNames(['card-title', styles.title])}>
                <Link
                    to={url('themes.show', {
                        theme: id,
                    })}
                    className="text-white"
                >
                    {title}
                </Link>
            </h4>
        </div>
    );
};

ThemeItem.defaultProps = defaultProps;
ThemeItem.propTypes = propTypes;

export default ThemeItem;
