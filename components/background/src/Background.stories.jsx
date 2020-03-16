import React from 'react';
import Background from './Background';

export default {
    component: Background,
    title: 'Components/Background',
};

export const normal = () => <Background width={200} height={200} color="#000" />;
