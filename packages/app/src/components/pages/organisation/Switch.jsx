/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useSetOrganisation } from '../../../contexts/OrganisationContext';
import { useApi } from '../../../contexts/ApiContext';
import MainLayout from '../../layouts/Main';

import styles from '../../../styles/pages/organisation/switch.module.scss';

const propTypes = {
    slug: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSwitch = ({ slug, className }) => {
    const api = useApi();
    const setOrganisation = useSetOrganisation();
    useEffect(() => {
        let canceled = false;
        api.organisations.findBySlug(slug).then(organisation => {
            if (!canceled) {
                setOrganisation(organisation);
            }
        });
        return () => {
            canceled = true;
        };
    }, [slug]);
    return (
        <MainLayout>
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                Chargement...
            </div>
        </MainLayout>
    );
};

OrganisationSwitch.propTypes = propTypes;
OrganisationSwitch.defaultProps = defaultProps;

export default OrganisationSwitch;
