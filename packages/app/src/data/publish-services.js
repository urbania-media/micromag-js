import { defineMessages } from 'react-intl';

const messages = defineMessages({
    slug: {
        defaultMessage: 'URL',
        description: 'Publish URL label',
    },
    visibility: {
        defaultMessage: 'Visibility',
        description: 'Field label',
    },
    archive: {
        defaultMessage: 'Archive file',
        description: 'Field label',
    },
    format: {
        defaultMessage: 'Format',
        description: 'Field label',
    },
    filename: {
        defaultMessage: 'Filename',
        description: 'Field label',
    },
});

export default [
    {
        id: 'micromag',
        label: 'Micromag.ca',
        settings: [
            {
                name: 'slug',
                type: 'text',
                label: messages.slug,
                defaultValue: '{Story slug}',
            },
            {
                name: 'visibility',
                type: 'select',
                label: messages.visibility,
                options: [
                    {
                        value: 'all',
                        label: 'Everyone',
                    },
                    {
                        value: 'organisation',
                        label: 'This organisation',
                    },
                ],
                defaultValue: 'all',
            },
        ],
    },
    {
        id: 'archive',
        label: messages.archive,
        settings: [
            {
                name: 'format',
                type: 'select',
                label: messages.format,
                options: [
                    {
                        value: 'zip',
                        label: 'ZIP',
                    },
                    {
                        value: 'tar',
                        label: 'TAR',
                    },
                ],
                defaultValue: 'zip',
            },
            {
                name: 'filename',
                type: 'text',
                label: messages.filename,
                defaultValue: '{Story title}',
            },
        ],
    },
];
