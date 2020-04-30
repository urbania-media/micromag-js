/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import * as AppPropTypes from '../../lib/PropTypes';
import styles from '../../styles/items/organisation.module.scss';

const propTypes = {
    item: AppPropTypes.organisation.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationItem = ({ item, className }) => {
    const url = useUrlGenerator();
    return (
        <Link
            href={url('organisation.switch', {
                organisation: item.slug,
            })}
            className={classNames([
                'list-group-item',
                'list-group-item-action',
                'list-group-item-dark',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <h6 className="mb-1">{item.name}</h6>
            <div className="d-flex">
                <small className="mr-2">12 stories</small>
                <small>2 users</small>
            </div>
        </Link>
    );
};

OrganisationItem.propTypes = propTypes;
OrganisationItem.defaultProps = defaultProps;

export default OrganisationItem;
