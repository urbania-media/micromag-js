/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Editor from './Editor';

export default {
    component: Editor,
    title: 'Editor/Tiptap',
    decorators: [],
    parameters: {
        intl: true,
    },
};

export function Normal() {
    return <Editor />;
}
