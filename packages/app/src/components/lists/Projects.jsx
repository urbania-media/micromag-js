/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useSetOrganisation as useSetOrganisationContext } from '../../contexts/OrganisationContext';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ProjectsList = ({ className }) => {
    const url = useUrlGenerator();
    const setOrganisation = useSetOrganisationContext();

    const onClickMyMicromags = useCallback(() => {
        setOrganisation(null);
    }, [setOrganisation]);

    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Link
                className={classNames([
                    'list-group-item',
                    'list-group-item-action',
                    'list-group-item-dark',
                    {
                        [className]: className !== null,
                    },
                ])}
                href={url('home')}
                onClick={onClickMyMicromags}
            >
                <h6 className="mb-1">
                    <FormattedMessage defaultMessage="My projects" />
                </h6>
                <div className="d-flex">
                    <small className="mr-2">12 stories</small>
                </div>
            </Link>
        </div>
    );
};

ProjectsList.propTypes = propTypes;
ProjectsList.defaultProps = defaultProps;

export default ProjectsList;
