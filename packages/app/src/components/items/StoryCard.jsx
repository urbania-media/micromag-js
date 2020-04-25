/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import styles from '../../styles/items/story-card.module.scss';

const messages = defineMessages({
    edit: {
        id: 'items.story.edit',
        defaultMessage: 'Edit',
    },
    settings: {
        id: 'items.story.settings',
        defaultMessage: 'Settings',
    },
});

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryCardItem = ({ item, className }) => {
    const url = useUrlGenerator();
    return (
        <Card
            title={item.title}
            links={[
                {
                    label: messages.edit,
                    href: url('stories.editor', {
                        story: item.id,
                    })
                },
                {
                    label: messages.settings,
                    href: url('stories.settings', {
                        story: item.id,
                    })
                },
            ]}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Inner
        </Card>
    );
};

StoryCardItem.propTypes = propTypes;
StoryCardItem.defaultProps = defaultProps;

export default StoryCardItem;
