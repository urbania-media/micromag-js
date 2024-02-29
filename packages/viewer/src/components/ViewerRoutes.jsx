/* eslint-disable react/jsx-props-no-spreading */
import { useRoutes, useUrlGenerator } from '@folklore/routes';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Route, Switch, useLocation } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

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
    const url = useUrlGenerator();
    const [, navigate] = useLocation();
    const { components: screens = [] } = story || {};
    const finalOnScreenChange = useCallback(
        (it) => {
            const screenIndex = screens.findIndex((screen) => {
                const { id: screenId } = screen;
                return screenId === it.id || screen === it;
            });
            navigate(
                url('screen', {
                    screen: pathWithIndex ? screenIndex + 1 : it.id,
                }),
            );
            if (onScreenChange !== null) {
                onScreenChange(it);
            }
        },
        [navigate, url, pathWithIndex, screens, onScreenChange],
    );

    return (
        <Switch>
            <Route path={routes.screen}>
                {({ screen: screenParam = null }) => {
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
            </Route>
            <Route>
                <Viewer {...otherProps} story={story} onScreenChange={finalOnScreenChange} />
            </Route>
        </Switch>
    );
};

ViewerRoutes.propTypes = propTypes;
ViewerRoutes.defaultProps = defaultProps;

export default ViewerRoutes;
