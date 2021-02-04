class FontsParser {
    constructor({ screensManager, fieldsManager }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
    }

    parse(story) {

        const { components = [] } = story || {};
        if (components === null) {
            return story;
        }

        const fonts = [];

        // loop screens
        const newComponents = components.reduce((currentComponents, screen) => {
            const currentComponent = screen;
            const { type = null } = currentComponent;
            const screenDefinition = this.screensManager.getDefinition(type) || {};

            // recursive-loop tous les fields
            // si id = fontFamily trouvé
            // getter le "path" du field trouvé, getter la value du field
            // checker si type === 'custom' || type === 'google'
            // si oui, push l'array de fonts de { type: 'custom', families: ['FontName+FamilyName',...], urls: [] }
            // comment connaitre ses families si le textStyle parent contient un fontStyle à bold / italic?

            return [...currentComponents, currentComponent];
        }, []);        

        return {...story, components: newComponents, fonts};
    }
}

export default FontsParser;