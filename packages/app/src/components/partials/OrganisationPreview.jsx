/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

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

const OrganisationPreview = ({ organisation, withoutAvatar, className }) => {
    const { name = 'Name' } = organisation || {};
    return (
        <div
            className={classNames([
                styles.container,
                'd-inline-flex',
                'align-items-center',
                'justify-content-center',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {!withoutAvatar ? <FontAwesomeIcon className="mr-2" icon={faSitemap} /> : null}
            {name}
        </div>
    );
};

OrganisationPreview.propTypes = propTypes;
OrganisationPreview.defaultProps = defaultProps;

export default OrganisationPreview;
