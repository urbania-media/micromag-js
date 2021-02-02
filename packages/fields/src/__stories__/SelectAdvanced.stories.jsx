/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import SelectAdvanced from '../components/SelectAdvanced';
import Tokens from '../components/Tokens';

export default {
    component: SelectAdvanced,
    title: 'Fields/SelectAdvanced',
};

const props = {
    name: 'heading1',
    options: [
        { value: { coco: 1, lime: 2 }, label: 'Un label' },
        { value: { coco: 3, lime: 2 }, label: 'Un label X' },
        { value: { coco: 1 }, label: 'Un autre label' },
        'lol',
    ],
};

const SelectFieldContainer = () => {
    const [value, setValue] = useState(null);
    return <SelectAdvanced value={value} {...props} onChange={setValue} />;
};

const TokensFieldContainer = () => {
    const [value, setValue] = useState(null);
    return <Tokens value={value} {...props} onChange={setValue} />;
};

export const normal = () => (
    <div className="container mt-4">
        <IntlProvider locale="fr" messages={{}}>
            <SelectFieldContainer />
        </IntlProvider>
    </div>
);

export const tokens = () => (
    <div className="container mt-4">
        <IntlProvider locale="fr" messages={{}}>
            <TokensFieldContainer />
        </IntlProvider>
    </div>
);
