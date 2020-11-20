import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useOrganisationThemes = (organisationId = null, query = null, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.organisations.themes.get(organisationId, query), [
        api,
        organisationId,
        query,
    ]);
    const { data, ...request } = useData(loader, opts);
    return {
        realThemes: data,
        // TODO: plug the backend
        themes: [
            {
                id: 1,
                title: 'My first theme is good',
                styles: {},
                components: [{ type: 'Ad' }, { type: 'Text' }],
            },
            {
                id: 2,
                title: 'My second theme',
                styles: {},
                components: [{ type: 'Ad' }],
            },
        ],
        ...request,
    };
};

export default useOrganisationThemes;
