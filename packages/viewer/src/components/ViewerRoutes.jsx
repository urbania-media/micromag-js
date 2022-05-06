/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useRoutes, useRoutePush } from '@micromag/core/contexts';
import Viewer from './Viewer';

const propTypes = {
    story: MicromagPropTypes.story, // .isRequired,
    pathWithIndex: PropTypes.bool,
    children: PropTypes.func,
    onScreenChange: PropTypes.func,
};

const defaultProps = {
    story: null,
    pathWithIndex: false,
    children: null,
    onScreenChange: null,
};

const ViewerRoutes = ({ story, pathWithIndex, children, onScreenChange, ...otherProps }) => {
    const routes = useRoutes();
    const push = useRoutePush();
    const { components: screens = [] } = story || {};
    const finalOnScreenChange = useCallback(
        (it) => {
            const screenIndex = screens.findIndex((screen) => {
                const { id: screenId } = screen;
                return screenId === it.id || screen === it;
            });
            push('screen', {
                screen: pathWithIndex ? screenIndex + 1 : it.id,
            });
            if (onScreenChange !== null) {
                onScreenChange(it);
            }
        },
        [push, pathWithIndex, screens, onScreenChange],
    );

    return (
        <Switch>
            <Route
                path={routes.home}
                exact
                render={() => (
                    <Viewer {...otherProps} story={story} onScreenChange={finalOnScreenChange} />
                )}
            />
            <Route
                path={routes.screen}
                render={({
                    match: {
                        params: { screen: screenParam = null },
                    },
                }) => {
                    const screenFromIndex =
                        pathWithIndex && screenParam !== null
                            ? screens[parseInt(screenParam, 10) - 1] || null
                            : null;
                    const screenId = pathWithIndex
                        ? (screenFromIndex || {}).id || null
                        : screenParam;
                    return (
                        <Viewer
                            {...otherProps}
                            story={story}
                            screen={screenId}
                            onScreenChange={finalOnScreenChange}
                        />
                    );
                }}
            />
        </Switch>
    );
};

ViewerRoutes.propTypes = propTypes;
ViewerRoutes.defaultProps = defaultProps;

export default ViewerRoutes;
