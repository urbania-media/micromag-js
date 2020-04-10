const getStyleFromRounded = value => {
    if (value == null) {
        return null;
    }
    const { rounded = null } = value;
    return {
        borderRadius: rounded ? '20%' : null
    };
};

export default getStyleFromRounded;
