import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import Screen from './Screen';

export default Node.create({
    name: 'screen',
    group: 'screen',
    content: 'block*',
    atom: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            type: {
                default: 'base',
                parseHTML: (element) => element.getAttribute('data-screen-type'),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div.screen',
                getAttrs: (node) => ({
                    type: node.getAttribute('data-screen-type'),
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            {
                ...HTMLAttributes,
                class: 'screen',
            },
            0,
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Screen);
    },
});
