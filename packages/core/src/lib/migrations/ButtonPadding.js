/* eslint-disable class-methods-use-this */
const testPadding = (element) => {
    const { boxStyle = null, label = null } = element || {};
    if (boxStyle === null) {
        return false;
    }

    const { textStyle = null } = label || {};
    const { fontFamily = null } = textStyle || {};
    const { name: fontName = null } = fontFamily || {};
    if (fontName !== 'Agrandir Tight') {
        return false;
    }

    const { padding = null } = boxStyle || {};
    if (padding === null) {
        return false;
    }

    const { top = null, bottom = null } = padding || {};
    if (top === null || bottom === null) {
        return false;
    }

    if (top <= bottom - 2) {
        return true;
    }

    return true;
};

const parsePadding = (element) => {
    const { boxStyle = null } = element || {};
    if (boxStyle === null) {
        return element;
    }
    const { padding = null } = boxStyle || {};
    if (padding === null) {
        return element;
    }
    const { bottom = null } = padding || {};
    if (bottom === null) {
        return element;
    }
    return {
        ...element,
        boxStyle: {
            ...boxStyle,
            padding: {
                ...padding,
                // top: bottom,
                // bottom,
            },
        },
    };
};

class ButtonPadding {
    test(screen) {
        const { footer = null, header = null } = screen || {};
        if (header === null || footer === null) {
            return false;
        }

        const { badge = null } = header || {};
        const { callToAction = null } = footer || {};
        if (callToAction === null) {
            return false;
        }
        if (badge === null) {
            return false;
        }

        const callHasPadding = testPadding(callToAction);
        if (callHasPadding) {
            return true;
        }

        const badgeHasPadding = testPadding(badge);
        if (badgeHasPadding) {
            return true;
        }

        return false;
    }

    parse(screen) {
        const { footer = null, header = null, ...restScreen } = screen || {};
        const { badge = null, ...restHeader } = header || {};
        const { callToAction = null, ...restFooter } = footer || {};

        return {
            ...restScreen,
            header: {
                ...restHeader,
                ...(badge !== null ? { badge: parsePadding(badge) } : null),
            },
            footer: {
                ...restFooter,
                ...(callToAction !== null ? { callToAction: parsePadding(callToAction) } : null),
            },
        };
    }
}

ButtonPadding.prototype.priority = 1;

export default ButtonPadding;
