import Layout from '../style/Layout';
import ComponentLayout from '../style/ComponentLayout';

const getArticleLayouts = () => {
    // const { theme = {} } = newStory || {};
    // const { textStyle = {} } = theme || {};
    // const { heading1 = {}, text = {} } = textStyle || {};
    // const titleStyles = TextStyle(heading1);

    const layoutStyles = Layout();
    const componentLayoutStyles = ComponentLayout();

    const defaultMargin = 20;

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
                    bottom: defaultMargin,
                },
            },
            photo: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            image: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            gallery: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            mosaic: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            audio: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            video: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            map: {
                margin: {
                    bottom: defaultMargin,
                },
            },
            quote: {
                columnStart: 1,
                columnSpan: 5,
                contentInset: {
                    left: false,
                },
                margin: {
                    right: 20,
                    bottom: defaultMargin,
                },
            },
        },
    };
};

export default getArticleLayouts;
