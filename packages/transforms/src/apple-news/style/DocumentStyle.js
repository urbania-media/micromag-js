import DocumentStyleDefinition from '../definitions/DocumentStyle.json';
import { validate } from '../../utils';

const DocumentStyle = ({ backgroundColor = '#333' } = {}) => {
    const content = {
        backgroundColor,
    };
    return validate(content, DocumentStyleDefinition);
};

export default DocumentStyle;
