import TextStyle from '../style/TextStyle';

const getArticleTextStyles = () => {
    // const { theme = {} } = story || {};
    // const { textStyle = {} } = theme || {};
    // const { heading1 = {}, text = {} } = textStyle || {};

    // const titleStyles = TextStyle(heading1);
    // const textStyles = TextStyle(text);

    const fontSize = 18;
    const lineHeight = 1.35;

    const titleStyles = TextStyle({
        fontFamily: 'Futura', // stylelint-disable-line
        fontSize: fontSize * 2,
        fontWeight: 'bold',
        lineHeight,
    });

    const textStyles = TextStyle({
        fontFamily: 'Palatino', // stylelint-disable-line
        fontSize,
        lineHeight,
    });

    return {
        componentTextStyles: {
            default: {
                textColor: '#000',
                linkStyle: {
                    textColor: '#F0F',
                    underline: true,
                },
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-heading1': {
                ...(titleStyles !== null ? titleStyles : {}),
                fontSize: fontSize * 2,
                lineHeight: 36,
                fontWeight: 'regular',
                fontWidth: 'expanded',
                textTransform: 'uppercase',
            },
            'default-heading2': {
                ...(titleStyles !== null ? titleStyles : {}),
                fontSize: 26,
                fontWeight: 'regular',
                fontWidth: 'expanded',
                textTransform: 'uppercase',
            },
            'default-title': {
                ...(titleStyles !== null ? titleStyles : {}),
                fontSize: 26,
                fontWeight: 'regular',
                fontWidth: 'expanded',
                textTransform: 'uppercase',
            },
            'default-body': {
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-text': {
                ...(textStyles !== null ? textStyles : {}),
            },
            'default-quote': {
                ...(textStyles !== null ? textStyles : {}),
                fontSize: 26,
            },
            'style-author': {
                ...(textStyles !== null ? textStyles : {}),
                fontStyle: 'italic',
            },
        },
    };
};

export default getArticleTextStyles;
