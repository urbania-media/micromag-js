/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label } from '@micromag/core/components';
import { useRoutePush } from '@micromag/core/contexts';
import { useOrganisation } from '@micromag/data';

import { useSetOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';

import styles from '../../../styles/pages/organisation/switch.module.scss';

const messages = defineMessages({
    switching: {
        id: 'pages.organisation.switch.switching',
        defaultMessage: 'Switching organisation...',
    },
});

const propTypes = {
    slug: PropTypes.string.isRequired,
    minimumDelay: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    minimumDelay: 1000,
    className: null,
};

const OrganisationSwitch = ({ slug, minimumDelay, className }) => {
    const push = useRoutePush();
    const setOrganisation = useSetOrganisation();
    const { organisation, error } = useOrganisation(slug);
    const [delayCompleted, setDelayCompleted] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setDelayCompleted(true), minimumDelay);
        return () => {
            clearTimeout(timeout);
        };
    }, [minimumDelay]);
    useEffect(() => {
        if (delayCompleted && organisation !== null) {
            setOrganisation(organisation);
        } else if (delayCompleted && error !== null) {
            push('home');
        }
    }, [delayCompleted, organisation, error, setOrganisation]);
    return (
        <MainLayout contentAlign="middle">
            <div
                className={classNames([
                    'container',
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <Label>{messages.switching}</Label>
            </div>
        </MainLayout>
    );
};

OrganisationSwitch.propTypes = propTypes;
OrganisationSwitch.defaultProps = defaultProps;

export default OrganisationSwitch;
