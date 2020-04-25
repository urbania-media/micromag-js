/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

// import * as AppPropTypes from '../lib/PropTypes';
import { OrganisationProvider } from '../contexts/OrganisationContext';
import MainLayout from './layouts/Main';
import Routes from './Routes';

const propTypes = {};

const defaultProps = {};

const App = () => (
    <OrganisationProvider>
        <MainLayout>
            <Routes />
        </MainLayout>
    </OrganisationProvider>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
