import { useMemo } from 'react';
import { useScreensManager } from '@micromag/core/contexts';

function useScreenStates(screen) {
    const { type } = screen || {};
    const screensManager = useScreensManager();
    const states = useMemo(() => {
        const definition = screensManager.getDefinition(type) || null;
        const { states: screenStates = null } = definition || {};
        return screenStates;
    }, [screensManager, type]);
    return states;
}

export default useScreenStates;
