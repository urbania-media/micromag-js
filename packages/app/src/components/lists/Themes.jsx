import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ThemeItem from '../items/Theme';

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.name,
        }),
    ),
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
};

const ThemesList = ({ items, className }) => {
    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row mx-n2 my-n2 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {items.map((it) => (
                    <div key={`theme-${it.id}`} className="col p-2">
                        <ThemeItem key={`item-${it.id}`} item={it} />
                    </div>
                ))}
            </div>
        </div>
    );
};

ThemesList.propTypes = propTypes;
ThemesList.defaultProps = defaultProps;

export default ThemesList;
