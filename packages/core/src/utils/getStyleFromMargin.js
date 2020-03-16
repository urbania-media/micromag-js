const getStyleFromMargin = value => {
    if (value == null) {
        return null;
    }
    const { top: marginTop = null, bottom: marginBottom = null } = value;
    return {
        marginTop,
        marginBottom,
    };
};

export default getStyleFromMargin;
