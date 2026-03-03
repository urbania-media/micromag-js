import DocumentStyleDefinition from '../definitions/DocumentStyle.json';
import { validate } from '../../utils';

const DocumentStyle = ({ backgroundColor = null } = {}) => {
    const content = {
        backgroundColor,
    };
    return validate(content, DocumentStyleDefinition);
};

export default DocumentStyle;
