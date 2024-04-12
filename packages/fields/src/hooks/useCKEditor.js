import { useEffect, useMemo, useState } from 'react';

/**
 * Locale loader
 */
const packageCache = { build: null, full: null };
const useCKEditor = ({ full = false } = {}) => {
    const [packages, setLoadedPackage] = useState({
        ...packageCache,
    });
    const key = useMemo(() => (full ? 'full' : 'build'), [full]);
    const loadedPackage = packages[key];

    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }
        import('@micromag/ckeditor/build').then(
            ({ default: { NormalEditor = null, FullEditor = null } }) => {
                packageCache[key] = key === 'full' ? FullEditor : NormalEditor;
                if (!canceled) {
                    setLoadedPackage({
                        [key]: packageCache[key],
                    });
                }
            },
        );

        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage, key]);
    return loadedPackage;
};

export default useCKEditor;
