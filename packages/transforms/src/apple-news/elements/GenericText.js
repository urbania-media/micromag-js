import hash from 'object-hash';
import TextStyle from '../style/TextStyle';
import { validate } from '../../utils';

const GenericText = (story, text, role = 'text', definition = null) => {
    const { body = null, textStyle = null } = text || {};
    // console.log('Generic text', body, textStyle); // eslint-disable-line

    const style = textStyle ? TextStyle(textStyle) : null;
    const styleName = style !== null ? hash(style) : null;
    const hasStyle = style !== null && styleName !== null;

    const content = {
        role,
        text: body,
        format: 'html',
        ...(hasStyle ? { style: styleName } : {}),
        layout: 'default',
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

export default GenericText;
