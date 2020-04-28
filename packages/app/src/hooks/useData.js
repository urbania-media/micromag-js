import { useState, useEffect, useCallback } from 'react';

import { useApi } from '../contexts/ApiContext';
import { useOrganisation as useContextOrganisation } from '../contexts/OrganisationContext';

export const useData = (loadData, { initialData = null, autoload = true } = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(initialData);

    const load = useCallback(() => {
        let canceled = false;
        setLoading(true);
        const promise = loadData()
            .then(newData => {
                if (!canceled) {
                    setData(newData);
                    setLoading(false);
                }
                return newData;
            })
            .catch(newError => {
                setError(newError);
                setLoading(false);
            });
        promise.cancel = () => {
            canceled = true;
            setLoading(false);
        };
        return promise;
    }, [loadData, setLoading, setData]);

    useEffect(() => {
        let loader = null;
        if (autoload) {
            loader = load();
        }
        return () => {
            if (loader !== null) {
                loader.cancel();
            }
        };
    }, [autoload, load]);
    return {
        data,
        load,
        loading,
        error,
    };
};

export const useStory = (id, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.stories.find(id), [api, id]);
    const { data, ...request } = useData(loader, opts);
    return {
        story: data,
        ...request,
    };
};

export const useStories = (query = null, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.stories.get(query), [api, query]);
    const { data, ...request } = useData(loader, opts);
    return {
        stories: data,
        ...request,
    };
};

export const useRecentStories = (count = 5, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.stories.getRecents(count), [api, count]);
    const { data, ...request } = useData(loader, opts);
    return {
        stories: data,
        ...request,
    };
};

export const useOrganisation = (id, opts) => {
    const api = useApi();
    const loader = useCallback(
        () =>
            id.match(/^[0-9]+$/) ? api.organisations.find(id) : api.organisations.findBySlug(id),
        [api, id],
    );
    const { data, ...request } = useData(loader, opts);
    return {
        organisation: data,
        ...request,
    };
};

export const useOrganisations = (query = null, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.organisations.get(query), [api, query]);
    const { data, ...request } = useData(loader, opts);
    return {
        organisations: data,
        ...request,
    };
};

export const useOrganisationTeam = (organisationId = null, query = null, opts) => {
    const api = useApi();
    const organisation = useContextOrganisation();
    const finalId = organisationId || organisation.id;
    const loader = useCallback(() => api.organisations.team.get(finalId, query), [
        api,
        finalId,
        query,
    ]);
    const { data, ...request } = useData(loader, opts);
    return {
        team: data,
        ...request,
    };
};
