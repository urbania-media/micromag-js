/* eslint-disable class-methods-use-this */
class KeypadSettings {
    test(screen) {
        const { type = null, keypadSettings = null } = screen || {};
        if (type !== 'keypad' || keypadSettings === null) {
            return false;
        }
        const { layout: keypadSettingsLayout = null } = keypadSettings || {};
        if (keypadSettingsLayout === null) {
            return false;
        }

        return true;
    }

    parse(screen) {
        const { keypadSettings = null, ...restScreen } = screen || {};
        const { layout: keypadSettingsLayout = null } = keypadSettings || {};
        return {
            ...restScreen,
            keypadLayout: keypadSettingsLayout,
        };
    }
}

KeypadSettings.prototype.priority = 1;

export default KeypadSettings;
