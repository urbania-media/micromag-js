/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, Slideshow } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';

import styles from '../../styles/pages/home-guest.module.scss';

import logo from '../../assets/logo-square-beta.svg';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomeGuestPage = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <MainLayout contentAlign="middle">
            <Page
                className={classNames([
                    'container',
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <div className="d-inline-block pb-4">
                    <Slideshow
                        width="320px"
                        height="200px"
                        items={[
                            <img src={logo} alt="micromag" className={styles.logo} />,
                            <img src={logo} alt="micromag" className={styles.logo} />,
                            <img src={logo} alt="micromag" className={styles.logo} />,
                        ]}
                    />
                </div>
                <div className="mt-4">
                    <div className="mb-4">
                        <Button href={url('register')} theme="primary" size="lg">
                            <FormattedMessage
                                defaultMessage="Create an account"
                                description="Create an account home nutton"
                            />
                        </Button>
                    </div>
                    <div>
                        <Button href={url('auth.login')} theme="secondary" outline>
                            <FormattedMessage
                                defaultMessage="Login"
                                description="Login home nutton"
                            />
                        </Button>
                    </div>
                </div>
            </Page>
        </MainLayout>
    );
};

HomeGuestPage.propTypes = propTypes;
HomeGuestPage.defaultProps = defaultProps;

export default HomeGuestPage;
