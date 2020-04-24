/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import DataStore from '../lib/DataStore';
import DataApi from '../lib/DataApi';
import DataRepository from '../lib/DataRepository';

const DataContext = React.createContext(null);

export const STORIES_TYPE = 'stories';
export const MEDIAS_ENTITY = 'medias';
export const USERS_ENTITY = 'users';
export const ORGANISATIONS_ENTITY = 'organisations';

export const useData = () => useContext(DataContext);
export const useDataRepository = (type = null) => {
    const { repository } = useData();
    return type !== null ? repository[type] : repository;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    repository: PropTypes.instanceOf(DataRepository),
    store: PropTypes.instanceOf(DataStore),
    api: PropTypes.instanceOf(DataApi),
    types: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
    repository: null,
    store: null,
    api: null,
    types: [STORIES_TYPE, MEDIAS_ENTITY, USERS_ENTITY, ORGANISATIONS_ENTITY],
};

export const DataProvider = ({
    store: initialStore,
    api: initialApi,
    repository: initialRepository,
    types,
    children,
}) => {
    const store = useMemo(() => initialStore || new DataStore(), [initialStore]);
    const api = useMemo(() => initialApi || new DataApi(), [initialApi]);
    const repository = useMemo(
        () =>
            initialRepository ||
            new DataRepository({
                types,
                store,
                api,
            }),
        [initialRepository],
    );

    return (
        <DataContext.Provider
            value={{
                api,
                store,
                repository,
                types,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = propTypes;
DataProvider.defaultProps = defaultProps;

export default DataContext;
