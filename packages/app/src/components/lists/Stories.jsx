import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ScreensProvider } from '@micromag/screens';
import StoryListItem from '../items/StoryList';
import Story from '../items/Story';

import styles from '../../styles/lists/stories.module.scss';

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.name,
        }),
    ),
    itemType: PropTypes.oneOf(['card', 'list']),
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    itemType: 'card',
    className: null,
};

const StoriesList = ({ items, itemType, className }) => {
    const ItemComponent = itemType === 'list' ? StoryListItem : Story;
    const itemsElement = items.map((it) => {
        const itemElement = <ItemComponent key={`item-${it.id}`} item={it} />;
        return itemType === 'card' ? (
            <div key={`item-wrap-${it.id}`} className="position-relative col p-2">
                {itemElement}
            </div>
        ) : (
            itemElement
        );
    });
    return (
        <ScreensProvider>
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {itemType === 'card' ? (
                    <div className="row mx-n2 my-n2 row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {itemsElement}
                    </div>
                ) : (
                    itemsElement
                )}
            </div>
        </ScreensProvider>
    );
};

StoriesList.propTypes = propTypes;
StoriesList.defaultProps = defaultProps;

export default StoriesList;
