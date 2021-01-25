import Layout from '../style/Layout';
import ComponentLayout from '../style/ComponentLayout';

const getArticleLayouts = () => {
    // const { theme = {} } = newStory || {};
    // const { textStyle = {} } = theme || {};
    // const { heading1 = {}, text = {} } = textStyle || {};
    // const titleStyles = TextStyle(heading1);

    const layoutStyles = Layout();
    const componentLayoutStyles = ComponentLayout();

    return {
        layout: {
            ...(layoutStyles !== null ? layoutStyles : {}),
        },
        componentLayouts: {
            default: {
                ...(componentLayoutStyles !== null ? componentLayoutStyles : {}),
            },
            // body_heading: {
            //     margin: {
            //         bottom: 10,
            //     },
            // },
            // body_text: {
            //     margin: {
            //         bottom: 20,
            //     },
            // },
            // photo: {
            //     margin: {
            //         bottom: 20,
            //     },
            // },
            // quote: {
            //     columnStart: 0,
            //     columnSpan: 5,
            //     contentInset: {
            //         left: true,
            //     },
            //     margin: {
            //         bottom: 10,
            //         right: 20,
            //     },
            // },
        },
    };
};

export default getArticleLayouts;
