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
            ],
        },
        {
            type: 'fields',
            name: 'highlight',
            label: defineMessage({
                defaultMessage: 'Highlight',
                description: 'Fields section label',
            }),
            isList: true,
            fields: [
                {
                    name: 'color',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'textColor',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Text color',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            type: 'fields',
            name: 'link',
            label: defineMessage({
                defaultMessage: 'Links',
                description: 'Fields section label',
            }),
            isList: true,
            fields: [
                {
                    name: 'color',
                    type: 'color',
                    label: defineMessage({
                        defaultMessage: 'Color',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'fontStyle',
                    component: 'font-style',
                    isHorizontal: true,
                    label: defineMessage({
                        defaultMessage: 'Style',
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
                    name: 'fontStyle',
                    transformName: 'transform',
                    label: defineMessage({
                        defaultMessage: 'Case',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};
