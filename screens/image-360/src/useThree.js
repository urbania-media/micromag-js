import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
let packageCache = null;
const useThree = () => {
    // transport
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
        import('three').then(
            ({
                Scene,
                PerspectiveCamera,
                SphereBufferGeometry,
                VideoTexture,
                TextureLoader,
                MeshBasicMaterial,
                Mesh,
                WebGLRenderer,
                MathUtils,
            }) => {
                packageCache = {
                    Scene,
                    PerspectiveCamera,
                    SphereBufferGeometry,
                    VideoTexture,
                    TextureLoader,
                    MeshBasicMaterial,
                    Mesh,
                    WebGLRenderer,
                    MathUtils,
                };
                if (!canceled) {
                    setLoadedPackage({
                        package: packageCache,
                    });
                }
            },
        );
        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage;
};

export default useThree;
