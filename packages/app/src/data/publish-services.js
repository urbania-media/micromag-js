import { defineMessages } from 'react-intl';

const messages = defineMessages({
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
