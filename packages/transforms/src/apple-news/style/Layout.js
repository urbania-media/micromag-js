import LayoutDefinition from '../definitions/Layout.json';
import { validate } from '../../utils';

const Layout = ({ columns = 8, width = 768, margin = 60, gutter = 20 } = {}) => {
    const content = {
        columns,
        width,
        margin,
        gutter,
    };
    return validate(content, LayoutDefinition);
};

export default Layout;
