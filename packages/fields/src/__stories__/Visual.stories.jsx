/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import VisualField from '../components/Visual';

export default {
    title: 'Fields/Visual',
    component: VisualField,
};

const FieldContainer = (props) => {
    const [value, setValue] = useState(null);
    return (
        <div className="container mt-4">
            <IntlProvider locale="fr" messages={{}}>
                <VisualField value={value} onChange={setValue} {...props} />
            </IntlProvider>
        </div>
    );
};

export const normal = () => <FieldContainer />;
