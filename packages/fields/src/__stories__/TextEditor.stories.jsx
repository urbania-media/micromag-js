import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import TextEditor from '../components/TextEditor';

export default {
    component: TextEditor,
    title: 'Fields/TextEditor',
};

const FieldContainer = () => {
    const [value, setValue] = useState(null);
    return <TextEditor value={value} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <IntlProvider locale="fr" messages={{}}>
            <FieldContainer />
        </IntlProvider>
    </div>
);
