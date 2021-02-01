import React from 'react';
import { FormattedMessage } from 'react-intl';

export const useSearchSections = ({
    recent = [],
    tags = [],
    team = [],
    sources: upstreamSources = [],
}) => {
    const sources = [
        {
            label: (
                <FormattedMessage defaultMessage="All sources" description="Media gallery source" />
            ),
            value: 'all',
        },
        // {
        //     label: (
        //         <FormattedMessage
        //             defaultMessage="This Micromag"
        //             description="Media gallery source"
        //         />
        //     ),
        //     value: 'micromag',
        // },
        ...(team.length > 0
            ? [
                  {
                      label: (
                          <FormattedMessage
                              defaultMessage="My files"
                              description="Media gallery source"
                          />
                      ),
                      value: 'user',
                  },
              ]
            : []),
        ...upstreamSources,
    ].filter((it) => it !== null);

    // const team = [
    //     {
    //         id: 1,
    //         label: 'Pierre',
    //         value: 'pierre',
    //         thumbnail_url: 'https://picsum.photos/id/2/50/50',
    //     },
    //     { id: 2, label: 'Paul', value: 'paul', color: 'blue' },
    // ];

    const usage = [
        {
            label: <FormattedMessage defaultMessage="Unused" description="Media label" />,
            value: 'unused',
        },
        {
            label: <FormattedMessage defaultMessage="Used" description="Media label" />,
            value: 'used',
        },
    ];

    const sections = [
        {
            value: 'recent',
            label: <FormattedMessage defaultMessage="Recent searches" description="Media label" />,
            items: recent,
        },
        {
            value: 'tags',
            label: <FormattedMessage defaultMessage="Tags" description="Media label" />,
            items: tags,
        },
        {
            value: 'users',
            label: <FormattedMessage defaultMessage="Added by" description="Media label" />,
            items: team,
        },
        {
            value: 'usage',
            label: <FormattedMessage defaultMessage="Usage" description="Media label" />,
            items: usage,
        },
    ];

    return {
        sources,
        sections,
    };
};

export default useSearchSections;
