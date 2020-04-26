/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import StoryListItem from '../items/StoryList';
import StoryCardItem from '../items/StoryCard';

import styles from '../../styles/lists/stories.module.scss';

const propTypes = {
    items: MicromagPropTypes.stories,
    itemType: PropTypes.oneOf(['card', 'list']),
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    itemType: 'card',
    className: null,
};

const StoriesList = ({ items, itemType, className }) => {
    const ItemComponent = itemType === 'list' ? StoryListItem : StoryCardItem;
    const itemsElement = items.map(it => {
        const itemElement = <ItemComponent key={`item-${it.id}`} item={it} />;
        return itemType === 'card' ? (
            <div className="col mt-2 mb-2">{itemElement}</div>
        ) : (
            itemElement
        );
    });
    return (
        <div
            className={classNames([
                styles.container,
                {
                    'mt-n2': itemType === 'card',
                    'mb-n2': itemType === 'card',
                    [className]: className !== null,
                },
            ])}
        >
            {itemType === 'card' ? (
                <div className="row row-cols-1 row-cols-md-2">{itemsElement}</div>
            ) : (
                itemsElement
            )}
        </div>
    );
};

StoriesList.propTypes = propTypes;
StoriesList.defaultProps = defaultProps;

export default StoriesList;
