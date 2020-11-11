import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { useUrlGenerator } from '@micromag/core/contexts';

import TeamPreview from '../partials/TeamPreview';
import SettingsButton from '../buttons/Settings';
import OrganisationMenu from '../menus/Organisation';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsMenubar = ({ organisation, className }) => {
    // const url = useUrlGenerator();
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-end',
                'justify-content-between',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <TeamPreview organisation={organisation} />
            <SettingsButton>
                <OrganisationMenu asList />
            </SettingsButton>
        </div>
    );
};

OrganisationSettingsMenubar.propTypes = propTypes;
OrganisationSettingsMenubar.defaultProps = defaultProps;

export default OrganisationSettingsMenubar;
