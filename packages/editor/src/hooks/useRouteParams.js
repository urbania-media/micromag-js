import { useRouteMatcher } from '@folklore/routes';
import { useMemo } from 'react';
import { useLocation } from 'wouter';

import { useRoutes } from '@micromag/core/contexts';


const useRouteParams = ({ screenOnly = false } = {}) => {
    const routes = useRoutes();

    const [location] = useLocation();
    const matcher = useRouteMatcher();

    const {
        screen = null,
        field = null,
        form = null,
    } = useMemo(() => {
        const paths = screenOnly
            ? [routes.screen, '/:screen/*', '*']
            : [routes['screen.field.form'], routes['screen.field'], routes.screen, '*'];
        return (
            paths.reduce((currentParams, path) => {
                if (currentParams !== null) {
                    return currentParams;
                }
                const [match = false, params] = matcher(path);
                return match ? params : currentParams;
            }, null) || {}
        );
    }, [routes, screenOnly, location, matcher]);

    const routeParams = useMemo(
        () =>
            screenOnly
                ? {
                      url: location,
                      screen,
                  }
                : {
                      url: location,
                      screen,
                      field,
                      form,
                  },
        [screenOnly, location, screen, field, form],
    );
    return routeParams;
};

export default useRouteParams;
