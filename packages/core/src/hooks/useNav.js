import { useMemo } from 'react';

export const useNav = (title, url) => {
    return useMemo(() => [{ url, label: title }], [title, url]);
};

export const useNavItems = (items) => {
    return useMemo(() => items.map(({ title, url }) => ({ url, label: title })), [items]);
};
