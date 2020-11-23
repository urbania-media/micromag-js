/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useUser } from '../../contexts/AuthContext';

import Avatar from '../partials/Avatar';

import { useSetOrganisation as useSetOrganisationContext } from '../../contexts/OrganisationContext';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ProjectItem = ({ className }) => {
    const user = useUser();
    const url = useUrlGenerator();
    const setOrganisation = useSetOrganisationContext();

    const onClickMyMicromags = useCallback(() => {
        setOrganisation(null);
    }, [setOrganisation]);

    return (
        <Link
            className={classNames([
                'list-group-item',
                'list-group-item-action',
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
            href={url('home')}
            onClick={onClickMyMicromags}
        >
            <Avatar inverted {...user} />
            <div className="ml-3">
                <h6 className="mb-1">
                    <FormattedMessage defaultMessage="My Stories" description="Menu item" />
                </h6>
                <div className="d-flex">
                    <small className="mr-2">12 stories</small>
                </div>
            </div>
        </Link>
    );
};

ProjectItem.propTypes = propTypes;
ProjectItem.defaultProps = defaultProps;

export default ProjectItem;
