import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { useRoutes } from '@micromag/core/contexts';

const useRouteParams = ({ screenOnly = false } = {}) => {
    const routes = useRoutes();

    const path = useMemo(
        () =>
            screenOnly
                ? [routes.screen, '*']
                : [routes['screen.field.form'], routes['screen.field'], routes.screen, '*'],
        [routes, screenOnly],
    );

    const {
        url,
        params: { screen = null, field = null, form = null },
    } = useRouteMatch({
        path,
    });

    const routeParams = useMemo(
        () =>
            screenOnly
                ? {
                      url,
                      screen,
                  }
                : {
                      url,
                      screen,
                      field,
                      form,
                  },
        [screenOnly, url, screen, field, form],
    );
    return routeParams;
};

export default useRouteParams;
