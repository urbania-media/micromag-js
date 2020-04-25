/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import OrganisationItem from '../items/Organisation';

import styles from '../../styles/lists/organisations.module.scss';

const propTypes = {
    items: MicromagPropTypes.stories,
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
            {items.map(it => (
                <OrganisationItem key={`organisation-${it.id}`} item={it} />
            ))}
        </div>
    );
};

OrganisationsList.propTypes = propTypes;
OrganisationsList.defaultProps = defaultProps;

export default OrganisationsList;
