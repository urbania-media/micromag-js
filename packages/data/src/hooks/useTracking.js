import { useCallback } from 'react';

const useTracking = () => {
    const track = useCallback(
        (category, action, label, value) => {
            console.log('Track:', category, action, label, value);
        },
        [],
    );
    return track;
};

export default useTracking;
