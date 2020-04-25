/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Media } from '@micromag/core/components';

import styles from '../../styles/items/story-list.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryListItem = ({ item, className }) => {
    return (
        <Media
            title={item.name}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Inner
        </Media>
    );
};

StoryListItem.propTypes = propTypes;
StoryListItem.defaultProps = defaultProps;

export default StoryListItem;
