import { useState, useEffect } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStory = id => {
    const [story, setStory] = useState(null);
    const api = useApi();
    useEffect(() => {
        let canceled = false;
        api.stories.find(id).then(newStory => {
            if (!canceled) {
                setStory(newStory);
            }
        });
        return () => {
            canceled = true;
        };
    }, [id, setStory]);
    return {
        story,
    };
};

export default useStory;
