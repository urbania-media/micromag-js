import React from 'react';
import Container from '../components/Container';
import '../../../intl/locale/fr';

export default {
    component: Container,
    title: 'App/App',
};

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

export const normal = () => (
    <Container locale="fr" memoryRouter apiBaseUrl={apiBaseUrl} apiUsesCookie authCheckOnMount />
);
