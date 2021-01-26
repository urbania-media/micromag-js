import hash from 'object-hash';
import TextStyle from '../style/TextStyle';
import { validate } from '../../utils';

const TextElement = (story, text, role = 'text', definition = null) => {
    const { componentLayouts = {} } = story;
    const { body = null, textStyle = null } = text || {};

    const style = textStyle ? TextStyle(textStyle) : null;
    const styleName = style !== null ? hash(style) : null;
    const hasStyle = style !== null && styleName !== null;

    const content = {
        role,
        ...(componentLayouts[role] ? { layout: role } : {}),
        text: body,
        format: 'html',
        // Uncomment for styles // ...(hasStyle ? { style: styleName } : {}),
    };
    const component = definition ? validate(content, definition) : null;

    return {
        story: {
            ...story,
            componentStyles: {
                ...(story.componentStyles || {}),
                ...(component !== null && hasStyle ? { [styleName]: style } : {}),
            },
        },
        component,
    };
};

export default TextElement;
