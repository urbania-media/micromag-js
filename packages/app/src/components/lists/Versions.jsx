import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VersionItem from '../items/Version';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    title: PropTypes.string,
    items: AppPropTypes.versions,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    items: [],
    className: null,
};

const VersionsList = ({ title, items, className }) => {
    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {title ? <h6>{title}</h6> : null}
            {items.map((it) => (
                <VersionItem key={`version-${it.id}`} item={it} />
            ))}
        </div>
    );
};

VersionsList.propTypes = propTypes;
VersionsList.defaultProps = defaultProps;

export default VersionsList;
