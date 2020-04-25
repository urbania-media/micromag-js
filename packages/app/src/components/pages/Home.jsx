/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label } from '@micromag/core/components';

import { useUser } from '../../contexts/AuthContext';
import { useOrganisation } from '../../contexts/OrganisationContext';
import PageHeader from '../partials/PageHeader';
import AccountBox from '../partials/AccountBox';
import OrganisationsList from '../lists/Organisations';

import styles from '../../styles/pages/home.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.home.title',
        defaultMessage: 'Micromag',
    },
    organisations: {
        id: 'pages.home.organisations',
        defaultMessage: 'Your organisations',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomePage = ({ className }) => {
    const user = useUser();
    const organisation = useOrganisation();
    return (
        <div
            className={classNames([
                'container',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <PageHeader title={organisation !== null ? organisation.name : messages.title} />

            <div className="row">
                <aside className="col-md-4 order-last">
                    <AccountBox />
                </aside>
                <div className="col-md-8">
                    {organisation === null ? (
                        <section>
                            <h5>
                                <Label>{messages.organisations}</Label>
                            </h5>
                            <OrganisationsList items={user.organisations} />
                        </section>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
