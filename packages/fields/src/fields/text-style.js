import { defineMessage } from 'react-intl';

import FontStyleWithAlign from '../components/FontStyleWithAlign';
import FontStyleTransform from '../components/FontStyleTransform';

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
                    component: FontStyleWithAlign,
                    fontStyleName: 'fontStyle',
                    alignName: 'align',
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
                    component: FontStyleTransform,
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
