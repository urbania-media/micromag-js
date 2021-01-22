import DocumentStyle from '../style/DocumentStyle';

const getArticleDocumentStyle = (newStory, story) => {
    // const { theme = {} } = newStory || {};
    // const layoutStyles = Layout();

    const documentStyle = DocumentStyle();

    return {
        documentStyle,
    };
};

export default getArticleDocumentStyle;
