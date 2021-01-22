import TextStyle from '../style/TextStyle';

const getArticleTextStyles = (newStory, story) => {
    const { theme = {} } = newStory || {};
    const { textStyle = {} } = theme || {};
    const { heading1 = {}, text = {} } = textStyle || {};

    const titleStyles = TextStyle(heading1);
    const textStyles = TextStyle(text);

    // console.log('THEME STUFF', heading1, titleStyles, textStyles);

    return {
        componentTextStyles: {
            default: {
                fontName: 'Helvetica',
                textColor: '#000',
                fontSize: 18,
                lineHeight: 22,
                linkStyle: {
                    textColor: '#000',
                    underline: false,
                },
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-title': {
                ...(titleStyles !== null ? titleStyles : {}),
            },
            'default-body': {
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-text': {
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-quote': {
                ...(textStyles !== null ? textStyles : {}),
            },
        },
    };
};

export default getArticleTextStyles;
