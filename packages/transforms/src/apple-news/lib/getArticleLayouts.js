import Layout from '../style/Layout';
import ComponentLayout from '../style/ComponentLayout';

const getArticleLayouts = (newStory, story) => {
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
        },
    };
};

export default getArticleLayouts;
