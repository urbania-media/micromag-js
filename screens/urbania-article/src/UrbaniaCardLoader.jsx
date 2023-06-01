/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';

import { isValidUrl } from '@micromag/core/utils';

import UrbaniaBaseArticleCard from './UrbaniaBaseArticleCard';

const propTypes = {
    theme: PropTypes.string,
    url: PropTypes.string,
    article: PropTypes.shape({
        type: PropTypes.string,
    }),
};

const defaultProps = {
    theme: 'card',
    url: null,
    article: null,
};

const UrbaniaCardLoader = ({ theme, url, article: initialArticle, ...props }) => {
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
        const { image = {}, header = {} } = props || {};
        const { url: imageUrl = null } = image || {};

        const {
            title: articleTitle = null,
            image: articleImage = null,
            metadata = {},
        } = article || {};

        const hasArticle = article !== null;

        const { site = null, canonical = null, readerUrl = null } = metadata || {};
        const { sizes = {} } = articleImage || {};
        const { medium = {}, large = {} } = sizes || {};

        return {
            hasArticle,
            title: articleTitle,

            site,
            image:
                imageUrl !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            url: readerUrl || canonical || url,
            header,
        };
    }, [article, url, hostname, props]);

    return <UrbaniaBaseArticleCard {...props} {...values} hasArticle={url !== null} />;
};

UrbaniaCardLoader.propTypes = propTypes;
UrbaniaCardLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaCardLoader);
