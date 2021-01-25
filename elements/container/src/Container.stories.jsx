import React from 'react';

import Container from './Container';

export default {
    component: Container,
    title: 'Elements/Container',
};

export const normal = () => (
    <Container width={380} height={380}>
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
        />
    </Container>
);
