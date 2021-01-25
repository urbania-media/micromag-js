import ComponentLayoutDefinition from '../definitions/ComponentLayout.json';
import { validate } from '../../utils';

const ComponentLayout = ({
    columnStart = 0,
    columnSpan = 12,
    marginTop = 0,
    marginBottom = 20,
} = {}) => {
    const content = {
        columnStart,
        columnSpan,
        margin: {
            top: marginTop,
            bottom: marginBottom,
        },
    };
    return validate(content, ComponentLayoutDefinition);
};

export default ComponentLayout;
