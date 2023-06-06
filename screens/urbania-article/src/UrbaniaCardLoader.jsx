/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import UrbaniaBaseArticleCard from './UrbaniaBaseArticleCard';
import UrbaniaLoader from './UrbaniaLoader';

function UrbaniaCardLoader(props) {
    return <UrbaniaLoader component={UrbaniaBaseArticleCard} {...props} />;
}

export default React.memo(UrbaniaCardLoader);
