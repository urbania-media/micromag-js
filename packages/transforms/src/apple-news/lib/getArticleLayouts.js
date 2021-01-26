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
            container: {
                margin: {
                    bottom: 40,
                },
            },
            header: {
                ignoreDocumentMargin: true,
                ignoreDocumentGutter: true,
                margin: {
                    bottom: 40,
                },
            },
            title: {
                margin: {
                    bottom: 10,
                },
            },
            heading1: {
                margin: {
                    bottom: 10,
                },
            },
            heading2: {
                margin: {
                    bottom: 10,
                },
            },
            text: {
                margin: {
                    bottom: 20,
                },
            },
            photo: {
                margin: {
                    bottom: 20,
                },
            },
            image: {
                margin: {
                    bottom: 20,
                },
            },
            quote: {
                columnStart: 1,
                columnSpan: 5,
                contentInset: {
                    left: false,
                },
                margin: {
                    bottom: 20,
                    right: 20,
                },
            },
        },
    };
};

export default getArticleLayouts;
