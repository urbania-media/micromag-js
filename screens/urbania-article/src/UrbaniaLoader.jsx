/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import UrbaniaArticle from './UrbaniaArticle';

const propTypes = {
    url: PropTypes.string,
    article: PropTypes.shape({}),
};

const defaultProps = {
    url: null,
    article: null,
};

const UrbaniaLoader = ({ url, article: initialArticle, ...props }) => {
    const [article, setArticle] = useState(initialArticle);
    console.log('fuuuu');

    useEffect(() => {
        if (url !== null) {
            // TODO: fix cors on urbania.ca
            getJSON(`${url}.json`, { mode: 'cors' }).then((art) => {
                setArticle(art);
            });
        }
    }, [url, setArticle]);

    const values = useMemo(() => {
        console.log('article', article);
        // From the top baby

        const {
            title = {},
            overTitle = {},
            image = {},
            video = {},
            callToAction = null,
        } = props || {};
        const { body: titleBody = null } = title || {};
        const { body: overTitleBody = null } = overTitle || {};
        const { url: imageUrl = null } = image || {};
        const { media: videoMedia = null } = video || {};

        // From article
        const {
            title: articleTitle = null,
            image: articleImage = null,
            metadata = {},
        } = article || {};
        const { authors = [], sponsors = [], site = 'urbania', canonical = null } = metadata || {};
        const { sizes = {} } = articleImage || {};
        const { medium, large } = sizes || {};

        return {
            title: titleBody !== null ? title : { ...title, body: articleTitle },
            overTitle: overTitleBody !== null ? overTitle : { ...overTitle, body: 'En vedette' },
            authors,
            sponsors,
            site,
            image:
                imageUrl !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            video: { ...video },
            callToAction: {
                active: true,
                type: 'swipe-up',
                url: videoMedia !== null ? videoMedia.url : canonical,
                label: videoMedia !== null ? { body: 'Regarder' } : { body: 'Lire' },
                ...callToAction,
            },
        };
    }, [article, props]);

    const { video: currentVideo = null } = values || {};
    const { media: currentMedia = null } = currentVideo || {};

    console.log('values', values);

    return <UrbaniaArticle {...props} {...values} isFullScreen={currentMedia !== null} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaLoader);
