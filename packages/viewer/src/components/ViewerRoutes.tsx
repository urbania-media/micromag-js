/* eslint-disable react/jsx-props-no-spreading */
import { useRoutes, useUrlGenerator } from '@folklore/routes';
import React, { useCallback } from 'react';
import { Route, Switch, useLocation } from 'wouter';

import type { Story } from '@micromag/core';

import Viewer from './Viewer';

interface ViewerRoutesProps {
    story?: Story | null;
    pathWithIndex?: boolean;
    onScreenChange?: ((...args: unknown[]) => void) | null;
}

function ViewerRoutes({
    story = null,
    pathWithIndex = false,
    onScreenChange = null,
    ...otherProps
}: ViewerRoutesProps) {
    const routes = useRoutes();
    const url = useUrlGenerator();
    const [, navigate] = useLocation();
    const { components: screens = [] } = story || {};
    const finalOnScreenChange = (it) => {
        const screenIndex = screens.findIndex((screen) => {
            const { id: screenId } = screen;
            return screenId === it.id || screen === it;
        });
        navigate(
            url('screen', {
                screen: pathWithIndex ? screenIndex + 1 : it.id,
            }) as string,
        );
        if (onScreenChange !== null) {
            onScreenChange(it);
        }
    };

    return (
        <Switch>
            <Route<{ screen?: string }> path={routes.screen}>
                {({ screen: screenParam = null }) => {
                    const screenFromIndex =
                        pathWithIndex && screenParam !== null
                            ? screens[parseInt(screenParam, 10) - 1] || null
                            : null;
                    const screenId = pathWithIndex ? screenFromIndex?.id || null : screenParam;
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
}

export default ViewerRoutes;
