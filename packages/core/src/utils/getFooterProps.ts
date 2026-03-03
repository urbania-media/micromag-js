import { useMemo } from 'react';

const getFooterProps = (
    footer = {},
    {
        isPreview = false,
        isView = false,
        current = false,
        openWebView = false,
        enableInteraction = true,
        disableInteraction = false,
        ...otherProps
    } = {},
) => {
    const { callToAction = null } = footer || {};
    const footerProps = useMemo(
        () => ({
            callToAction: {
                ...callToAction,
                animationDisabled: isPreview,
                focusable: current && isView,
                openWebView,
                enableInteraction,
                disableInteraction,
                ...otherProps,
            },
        }),
        [
            callToAction,
            isPreview,
            isView,
            current,
            enableInteraction,
            disableInteraction,
            otherProps,
        ],
    );
    return footerProps;
};

export default getFooterProps;
