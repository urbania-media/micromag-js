import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
let packageCache = null;
const useCKEditor = () => {
    const [{ package: loadedPackage }, setLoadedPackage] = useState({
        package: packageCache,
    });
    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }
        import('@micromag/ckeditor/build').then(({ default: Editor }) => {
            packageCache = Editor;
            if (!canceled) {
                setLoadedPackage({
                    package: Editor,
                });
            }
        });
        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage;
};

export default useCKEditor;
