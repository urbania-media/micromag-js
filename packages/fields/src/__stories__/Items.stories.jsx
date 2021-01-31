import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import ImagesField from '../components/Images';
// import TextField from '../components/Text';

export default {
    component: ImagesField,
    title: 'Fields/ImagesField',
};

const FieldContainer = () => {
    const [value, setValue] = useState([]);
    return <ImagesField value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <IntlProvider locale="fr" messages={{}}>
            <FieldContainer />
        </IntlProvider>
    </div>
);
