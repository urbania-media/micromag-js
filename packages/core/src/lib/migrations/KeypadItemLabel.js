import { isString } from 'lodash';

/* eslint-disable class-methods-use-this */
class KeypadItemLabel {
    test(screen) {
        const { type = null, items = null } = screen || {};
        if (type !== 'keypad' || items === null || items.length === 0) {
            return false;
        }
        const hasStringItemLabel = (items || []).some(
            (item = null) => item !== null && isString(item?.label),
        );
        if (!hasStringItemLabel) {
            return false;
        }
        return true;
    }

    parse(screen) {
        const { items = null, ...restScreen } = screen || {};
        return {
            ...restScreen,
            items: items.map((item = null) => {
                if (item === null || !isString(item?.label)) {
                    return item;
                }
                const { label, textStyle, ...restAnswer } = item || {};
                return {
                    ...restAnswer,
                    label: { body: label, textStyle },
                };
            }),
        };
    }
}

export default KeypadItemLabel;
