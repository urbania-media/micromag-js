/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label } from '@micromag/core/components';

import { useSetOrganisation } from '../../../contexts/OrganisationContext';
import { useApi } from '../../../contexts/ApiContext';
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
    const api = useApi();
    const setOrganisation = useSetOrganisation();
    useEffect(() => {
        let canceled = false;
        let delayCompleted = false;
        let newOrganisation = null;
        let timeout = null;
        const checkDone = () => {
            if (delayCompleted && newOrganisation !== null) {
                setOrganisation(newOrganisation);
            }
            timeout = null;
        };
        timeout = setTimeout(() => {
            delayCompleted = true;
            checkDone();
        }, minimumDelay);
        api.organisations.findBySlug(slug).then(organisation => {
            if (!canceled) {
                newOrganisation = organisation;
                checkDone();
            }
        });
        return () => {
            canceled = true;
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [slug, minimumDelay]);
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
