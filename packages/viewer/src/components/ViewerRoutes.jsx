/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { useRoutes, useRoutePush } from '@micromag/core/contexts';

import Viewer from './Viewer';

const propTypes = {
    children: PropTypes.func,
    onScreenChange: PropTypes.func,
};

const defaultProps = {
    children: null,
    onScreenChange: null,
};

const ViewerRoutes = ({ children, onScreenChange, ...otherProps }) => {
    const routes = useRoutes();
    const push = useRoutePush();
    const finalOnScreenChange = useCallback(
        it => {
            push('screen', {
                screen: it.id,
            });
            if (onScreenChange !== null) {
                onScreenChange(it);
            }
        },
        [push, onScreenChange],
    );

    return (
        <Switch>
            <Route
                path={routes.home}
                exact
                render={() => <Viewer {...otherProps} onScreenChange={finalOnScreenChange} />}
            />
            <Route
                path={routes.screen}
                render={({
                    match: {
                        params: { screen },
                    },
                }) => (
                    <Viewer {...otherProps} screen={screen} onScreenChange={finalOnScreenChange} />
                )}
            />
        </Switch>
    );
};

ViewerRoutes.propTypes = propTypes;
ViewerRoutes.defaultProps = defaultProps;

export default ViewerRoutes;
