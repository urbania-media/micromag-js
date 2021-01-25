import { validate } from '../../utils';
import HeaderDefinition from '../definitions/Header.json';

const Header = (story, props) => {
    console.log('HEADER', components); // eslint-disable-line

    const content = {
        role: 'header',
        ...props,
    };

    const component = validate(content, HeaderDefinition);

    return {
        story,
        component,
    };
};

export default Header;
