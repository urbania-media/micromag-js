/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';

import Avatar from './Avatar';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/organisation-preview.module.scss';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    withoutAvatar: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutAvatar: false,
    className: null,
};

const OrganisationPartial = ({ organisation, withoutAvatar, className }) => {
    const { name = null } = organisation || {};
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    'd-inline-flex',
                    'align-items-center',
                    'justify-content-center',
                ])}
            >
                {withoutAvatar ? (
                    <FontAwesomeIcon className="mr-2" icon={faSitemap} />
                ) : (
                    <Avatar className="mr-2" square inverted {...organisation} />
                )}
                {name}
            </div>
        </div>
    );
};

OrganisationPartial.propTypes = propTypes;
OrganisationPartial.defaultProps = defaultProps;

export default OrganisationPartial;
