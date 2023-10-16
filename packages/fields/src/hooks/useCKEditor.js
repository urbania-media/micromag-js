import { useState, useEffect, useMemo } from 'react';

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
        if (full) {
            import('@micromag/ckeditor/full').then(({ default: Editor }) => {
                packageCache.full = Editor;
                if (!canceled) {
                    setLoadedPackage({
                        full: Editor,
                    });
                }
            });
        } else {
            import('@micromag/ckeditor/build').then(({ default: Editor }) => {
                packageCache.build = Editor;
                if (!canceled) {
                    setLoadedPackage({
                        build: Editor,
                    });
                }
            });
        }

        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage;
};

export default useCKEditor;
