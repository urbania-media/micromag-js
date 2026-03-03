import { validate } from '../../utils';
import ContainerDefinition from '../definitions/Container.json';

const Container = (story, components) => {
    const content = {
        role: 'container',
        components,
    };
    const component = validate(content, ContainerDefinition);
    return {
        story,
        component: components && components.length > 0 ? component : null,
    };
};

export default Container;
