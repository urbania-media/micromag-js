import entry from './entry';

export default {
    ...entry,
    id: 'entry-with-image',
    fields: [
        ...entry.fields,
    ]
};
