import React from 'react';
import Container from '../components/Container';
import '../../../intl/locale/fr';

export default {
    component: Container,
    title: 'App/App',
};

export const normal = () => (
    <Container
        locale="fr"
        memoryRouter
        apiBaseUrl={`${window.location.protocol}//${window.location.host}/api`}
    />
);
