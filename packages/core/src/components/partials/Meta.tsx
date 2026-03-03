/* eslint-disable react/no-array-index-key */
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaProps {
    title?: string | null;
    url?: string | null;
    metadata?: unknown | null;
    fullTitle?: string | null;
    suffix?: string;
    children?: React.ReactNode | null;
}

function Meta({
    title = null,
    url = null,
    metadata = null,
    fullTitle = null,
    suffix = 'Micromag',
    children = null,
}: MetaProps) {
    const {
        canonical = null,
        description = null,
        keywords = null,
        image = null,
        favicon = null,
        rssUrl = null,
        atomUrl = null,
        microformats = [],
        language = null,
    } = metadata || {};

    const realTitle = title !== null ? `${title} | ${suffix}` : fullTitle;

    const { url: imageUrl = null, metadata: imageMetadata = {} } = image || {};
    const { width: imageWidth = null, height: imageHeight = null } = imageMetadata || {};
    const { url: faviconUrl = null } = favicon || {};

    return (
        <Helmet>
            {/* General */}
            <title>{realTitle !== null && realTitle.length > 0 ? realTitle : 'Micromag'}</title>
            {description !== null ? <meta name="description" content={description} /> : null}
            {language !== null ? <meta name="language" content={language} /> : null}
            {keywords !== null && isString(keywords) ? (
                <meta name="keywords" content={keywords} />
            ) : null}
            {keywords !== null && isArray(keywords) ? (
                <meta name="keywords" content={keywords.join(',')} />
            ) : null}
            {canonical !== null ? <link rel="canonical" href={canonical} /> : null}

            {/* Favicon */}
            {faviconUrl !== null ? <link rel="icon" type="image/png" href={faviconUrl} /> : null}

            {/* Feeds */}
            {rssUrl !== null ? (
                <link rel="alternate" type="application/rss+xml" href={rssUrl} />
            ) : null}
            {atomUrl !== null ? (
                <link rel="alternate" type="application/atom+xml" href={atomUrl} />
            ) : null}

            {/* Open graph */}
            {imageUrl !== null ? <meta property="og:image" content={imageUrl} /> : null}
            {imageUrl !== null ? <meta property="og:image:url" content={imageUrl} /> : null}
            {imageWidth !== null ? <meta property="og:image:width" content={imageWidth} /> : null}
            {imageHeight !== null ? (
                <meta property="og:image:height" content={imageHeight} />
            ) : null}
            <meta property="og:title" content={realTitle} />
            {description !== null ? <meta property="og:description" content={description} /> : null}
            {url !== null ? <meta property="og:url" content={url} /> : null}

            {/* Twitter */}
            <meta
                name="twitter:card"
                content={imageUrl !== null ? 'summary_large_image' : 'summary'}
            />
            <meta name="twitter:title" content={realTitle} />
            {description !== null ? (
                <meta name="twitter:description" content={description} />
            ) : null}
            {imageUrl !== null ? <meta name="twitter:image" content={imageUrl} /> : null}

            {/* Microformats */}
            {(microformats || []).map((it) => (
                <script
                    type="application/ld+json"
                    id={`${it[`@type`]}-${it.identifier}`}
                    key={`microformat-${it[`@type`]}-${it.identifier}`}
                >
                    {JSON.stringify(it)}
                </script>
            ))}
            {/* Other tags */}
            {children}
        </Helmet>
    );
}

export default Meta;
