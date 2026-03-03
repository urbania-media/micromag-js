const getStyleFromMargin = (value) => {
    if (value == null) {
        return null;
    }
    const { top: marginTop = null, bottom: marginBottom = null } = value;
    return {
        ...(marginTop !== null ? { marginTop } : null),
        ...(marginBottom !== null ? { marginBottom } : null),
    };
};

export default getStyleFromMargin;
