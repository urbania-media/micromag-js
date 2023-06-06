/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { isTextFilled, isValidUrl } from '@micromag/core/utils';

import UrbaniaBaseArticle from './UrbaniaBaseArticle';

const propTypes = {
    component: PropTypes.elementType,
    theme: PropTypes.string,
    url: PropTypes.string,
    article: PropTypes.shape({
        type: PropTypes.string,
    }),
};

const defaultProps = {
    component: UrbaniaBaseArticle,
    theme: null,
    url: null,
    article: null,
};

const UrbaniaLoader = ({ component: Component, theme, url, article: initialArticle, ...props }) => {
    const [article, setArticle] = useState(initialArticle);

    const hostname = useMemo(() => {
        const { hostname: urlHostname = null } =
            url !== null && isValidUrl(url) ? new URL(url) : {};
        return urlHostname;
    }, [url]);

    useEffect(() => {
        if (url !== null && isValidUrl(url)) {
            getJSON(`${url}.json`, { mode: 'cors' }).then((art) => {
                setArticle(art || null);
            });
        }
    }, [url, setArticle]);

    const values = useMemo(() => {
        const {
            articleType = null,
            title = {},
            overTitle = {},
            sponsorLabel = {},
            author = null,
            image = {},
            header = {},
            footer = {},
        } = props || {};
        const { url: imageUrl = null } = image || {};
        const { callToAction = null } = footer || {};
        const { url: ctaUrl = null } = callToAction || {};

        // Straight from article
        const {
            type = null,
            title: articleTitle = null,
            image: articleImage = null,
            metadata = {},
        } = article || {};

        const hasArticle = article !== null;

        const {
            authors = [],
            sponsors = [],
            site = null,
            canonical = null,
            readerUrl = null,
        } = metadata || {};
        const { sizes = {} } = articleImage || {};
        const { medium = {}, large = {} } = sizes || {};
        const articleAuthor = (authors || []).length > 0 ? authors[0] : null;
        const { name: authorName = null, avatar: authorImage = null } = articleAuthor || {};
        const finalArticleAuthor = {
            ...(authorName !== null ? { name: { body: `<p>${authorName}</p>` } } : null),
            ...(authorImage !== null ? { image: authorImage } : null),
        };

        // Type
        const defaultType = articleType || type;

        // Url
        const finalReaderUrl =
            readerUrl !== null ? `${readerUrl}${theme !== null ? `?theme=${theme}` : ''}` : null;

        // Sponsors
        const defaultSponsor =
            (sponsors || []).length > 0
                ? (sponsors || [])
                      .map(({ name = null }) => name)
                      .filter((name) => name !== null)
                      .join(', ')
                      .trim()
                : null;

        // Content
        const hasTitle = isTextFilled(title);
        const hasOverTitle = isTextFilled(overTitle);
        const hasSponsorProps = isTextFilled(sponsorLabel);

        const sponsorPrefix =
            !hasSponsorProps && defaultSponsor !== null ? (
                <FormattedMessage defaultMessage="Presented by" description="Sponsor label" />
            ) : null;

        return {
            type: defaultType,
            title: hasTitle ? title : { ...title, body: articleTitle },
            articleTitle,
            overTitle: hasOverTitle ? overTitle : { ...overTitle, body: 'En vedette' },
            author: { ...finalArticleAuthor, ...author },
            sponsors:
                defaultSponsor !== null && !hasSponsorProps
                    ? [{ ...sponsorLabel, body: `<strong>${defaultSponsor}</strong>` }]
                    : [sponsorLabel],
            sponsorPrefix,
            site,
            image:
                imageUrl !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            url: finalReaderUrl || canonical || url,
            header,
            footer: {
                ...footer,
                callToAction: {
                    type: 'swipe-up',
                    label: defaultType === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                    inWebView: true,
                    ...callToAction,
                    ...(hasArticle ? { active: url !== null } : null),
                    url: ctaUrl || readerUrl || canonical,
                },
            },
        };
    }, [article, url, hostname, props]);

    return <Component {...props} {...values} hasArticle={url !== null} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaLoader);
