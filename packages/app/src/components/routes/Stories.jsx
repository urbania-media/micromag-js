/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { useRoutes } from '@micromag/core/contexts';

import StoriesPage from '../pages/stories/Stories';
import EditorPage from '../pages/stories/Editor';

const propTypes = {};

const defaultProps = {};

const StoriesRoutes = () => {
    const routes = useRoutes();
    return (
        <Switch>
            <Route path={routes.stories} exact component={StoriesPage} />
            <Route path={routes.editor} exact component={EditorPage} />
        </Switch>
    );
};

StoriesRoutes.propTypes = propTypes;
StoriesRoutes.defaultProps = defaultProps;

export default StoriesRoutes;
