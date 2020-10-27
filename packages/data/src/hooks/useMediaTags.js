import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useMediaTags = (count = 5, opts) => {
    const api = useApi();
    // TODO: implement this
    // api.medias.getTags(count)
    const getItems = useCallback(() => new Promise(() => []), [api, count]);
    const { items, ...request } = useItems({
        getItems,
        ...opts,
    });
    return {
        tags: [
            { id: 1, label: 'Tag1', value: 'tag1' },
            { id: 2, label: 'Tag2', value: 'tag2' },
            { id: 2, label: 'Tag3', value: 'tag3' },
        ],
        ...request,
    };
};

export default useMediaTags;
