import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OrganisationItem from '../items/Organisation';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/lists/organisations.module.scss';

const propTypes = {
    items: AppPropTypes.organisations,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
};

const OrganisationsList = ({ items, className }) => {
    return (
        <div
            className={classNames([
                'list-group',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {items.map((it) => (
                <OrganisationItem key={`organisation-${it.id}`} item={it} />
            ))}
        </div>
    );
};

OrganisationsList.propTypes = propTypes;
OrganisationsList.defaultProps = defaultProps;

export default OrganisationsList;
