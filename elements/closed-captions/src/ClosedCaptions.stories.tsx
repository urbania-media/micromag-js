/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React, { useEffect, useState } from 'react';

// import { closedCaptionsMedia } from '#.storybook/data';
import ClosedCaptions from './ClosedCaptions';

const meta = preview.meta({
    component: ClosedCaptions,
    title: 'Elements/ClosedCaptions',
});

const props = { media: null };

export const normal = meta.story(() => <ClosedCaptions {...props} currentTime={2} />);

export const overTime = meta.story(() => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        let currentSeconds = 0;
        const increaseSeconds = () => {
            currentSeconds += 0.1;
            if (currentSeconds > 10) {
                currentSeconds = 0;
            }
            setCurrentTime(currentSeconds);
        };
        const interval = setInterval(increaseSeconds, 100);
        return () => {
            clearInterval(interval);
        };
    }, [setCurrentTime]);

    return (
        <>
            <div>Time: {currentTime.toFixed(1)} </div>
            <ClosedCaptions {...props} currentTime={currentTime} />
        </>
    );
});
