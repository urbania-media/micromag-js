/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

// import * as AppPropTypes from '../lib/PropTypes';
import MainLayout from './layouts/Main';
import Routes from './Routes';

const propTypes = {};

const defaultProps = {};

const App = () => (
    <MainLayout>
        <Routes />
    </MainLayout>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
