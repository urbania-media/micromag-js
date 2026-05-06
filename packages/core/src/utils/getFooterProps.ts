import { Footer } from '../types';

function getFooterProps(
    footer: Footer | null = {},
    {
        isPreview = false,
        isView = false,
        current = false,
        openWebView = false,
        enableInteraction = true,
        disableInteraction = false,
        ...otherProps
    } = {},
) {
    const { callToAction = null } = footer || {};
    return {
        callToAction: {
            ...callToAction,
            animationDisabled: isPreview,
            focusable: current && isView,
            openWebView,
            enableInteraction,
            disableInteraction,
            ...otherProps,
        },
    };
}

export default getFooterProps;
