import { defineMessage } from 'react-intl';

export default {
    id: 'text-style',
    fields: [
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Typography',
                description: 'Fields section label',
            }),
            isList: true,
            fields: [
                {
                    name: 'fontFamily',
                    type: 'font-family',
                    label: defineMessage({
                        defaultMessage: 'Font family',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'color',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'fontSize',
                    type: 'font-size',
                    label: defineMessage({
                        defaultMessage: 'Font size',
                        description: 'Field label',
                    }),
                },
                {
                    component: 'font-style-with-align',
                    fontStyleName: 'fontStyle',
                    alignName: 'align',
                },
                {
                    name: 'highlightColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Highlight color',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'linkColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Link color',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            type: 'fields',
            label: defineMessage({
                defaultMessage: 'Advanced settings',
                description: 'Fields section label',
            }),
            isList: true,
            fields: [
                {
                    name: 'lineHeight',
                    type: 'line-height',
                    label: defineMessage({
                        defaultMessage: 'Line height',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'letterSpacing',
                    type: 'letter-spacing',
                    label: defineMessage({
                        defaultMessage: 'Letter spacing',
                        description: 'Field label',
                    }),
                },
                {
                    component: 'font-style-transform',
                    fontStyleName: 'fontStyle',
                    label: defineMessage({
                        defaultMessage: 'Case',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};
