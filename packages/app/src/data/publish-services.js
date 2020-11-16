import { defineMessages } from 'react-intl';

const messages = defineMessages({
    slug: {
        id: 'publish_services.micromag.url',
        defaultMessage: 'URL',
    },
    visibility: {
        id: 'publish_services.micromag.visibility',
        defaultMessage: 'Visibility',
    },
    archive: {
        id: 'publish_services.archive',
        defaultMessage: 'Archive file',
    },
    format: {
        id: 'publish_services.archive.format',
        defaultMessage: 'Format',
    },
    filename: {
        id: 'publish_services.archive.filename',
        defaultMessage: 'Filename',
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
