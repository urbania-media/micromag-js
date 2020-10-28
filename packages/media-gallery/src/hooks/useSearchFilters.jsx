import React from 'react';
import { FormattedMessage } from 'react-intl';

export const useSearchSections = ({ recent, tags }) => {
    const sources = [
        {
            label: (
                <FormattedMessage
                    defaultMessage="All sources"
                    description="Source from all places"
                />
            ),
            value: 'all',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="This Micromag"
                    description="Source from this micromag"
                />
            ),
            value: 'self',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="Some other micromag"
                    description="Source from another micromag"
                />
            ),
            value: 'some-other-micromag',
        },
    ];

    const team = [
        {
            id: 1,
            label: 'Pierre',
            value: 'pierre',
            thumbnail_url: 'https://picsum.photos/id/2/50/50',
        },
        { id: 2, label: 'Paul', value: 'paul', color: 'blue' },
    ];

    const usage = [
        {
            label: (
                <FormattedMessage
                    defaultMessage="Already used"
                    description="Media has been use somewhere"
                />
            ),
            value: 'unused',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="Unused"
                    description="Media has not been used somewhere"
                />
            ),
            value: 'used',
        },
    ];

    const sections = [
        {
            value: 'recent',
            label: (
                <FormattedMessage
                    defaultMessage="Recent searches"
                    description="Label for recent search section"
                />
            ),
            items: recent,
        },
        {
            value: 'tags',
            label: (
                <FormattedMessage
                    defaultMessage="Tags"
                    description="Label for tags search section"
                />
            ),
            items: tags,
        },
        {
            value: 'users',
            label: (
                <FormattedMessage
                    defaultMessage="Added by"
                    description="Label for users search section"
                />
            ),
            items: team,
        },
        {
            value: 'usage',
            label: (
                <FormattedMessage
                    defaultMessage="Usage"
                    description="Label for usage search section"
                />
            ),
            items: usage,
        },
    ];

    return {
        sources,
        sections,
    };
};

export default useSearchSections;
