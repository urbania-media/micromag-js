import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
let packageCache = null;
const useUppyCore = () => {
    // transport
    const [{ package: loadedPackage = null }, setLoadedPackage] = useState({
        package: packageCache,
    });
    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }
        import('@uppy/core').then(({ Uppy, ...other }) => {
            const { default: defaultPackage } = other || {};
            packageCache = Uppy || defaultPackage;
            if (!canceled) {
                setLoadedPackage({
                    package: Uppy || defaultPackage,
                });
            }
        });
        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);

    return loadedPackage;
};

export default useUppyCore;
