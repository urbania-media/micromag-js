/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
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
    // const { isView } = useScreenRenderContext();

    // const hostname = useMemo(() => {
    //     const { hostname: urlHostname = null } =
    //         url !== null && isValidUrl(url) ? new URL(url) : {};
    //     return urlHostname;
    // }, [url]);

    const finalUrl =
        url !== null && isValidUrl(url)
            ? url.replace(/^https?:\/\/([^.]+\.)?urbania\.(ca|ƒr)\//, 'https://urbania.$2/')
            : url;

    useEffect(() => {
        if (finalUrl !== null && isValidUrl(finalUrl)) {
            getJSON(`https://api.urbania.ca/documents?uri=${finalUrl}`, { mode: 'cors' })
                .then((art) => {
                    setArticle(art || null);
                })
                .catch(() => setArticle(null));
        }
    }, [finalUrl, setArticle]);

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

        const { authors = [], sponsors = [], brands = [] } = metadata || {};

        const [creditAuthor = null] = authors || [];
        const [{ handle: site = null } = {}] = brands || [];

        const { sizes = {} } = articleImage || {};
        const { medium = {}, large = {} } = sizes || {};
        const { name: authorName = null, image: authorImage = null } = creditAuthor || {};

        const finalArticleAuthor = {
            ...(authorName !== null ? { name: { body: `<p>${authorName}</p>` } } : null),
            ...(authorImage !== null ? { image: authorImage } : null),
        };

        // Type
        const defaultType = articleType || type;

        // Sponsors
        const defaultSponsor =
            (sponsors || []).length > 0
                ? (sponsors || [])
                      .map(({ organisation: { name = null } = {} }) => name)
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
                imageUrl !== null && image !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            url: finalUrl,
            header,
            footer: {
                ...footer,
                callToAction: {
                    type: 'swipe-up',
                    label: defaultType === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                    inWebView: true,
                    ...callToAction,
                    ...(hasArticle ? { active: finalUrl !== null } : null),
                    url: ctaUrl || finalUrl,
                },
            },
        };
    }, [article, finalUrl, props]);

    return <Component {...props} {...values} hasArticle={finalUrl !== null && article !== null} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default UrbaniaLoader;
