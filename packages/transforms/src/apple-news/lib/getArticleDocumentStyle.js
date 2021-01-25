import DocumentStyle from '../style/DocumentStyle';

const getArticleDocumentStyle = () => {
    const documentStyle = DocumentStyle({ backgroundColor: '#FFF' });

    return {
        documentStyle,
    };
};

export default getArticleDocumentStyle;
