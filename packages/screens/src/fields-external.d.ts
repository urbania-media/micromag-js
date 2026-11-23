declare module '../fields' {
    const fields: Record<string, Array<RegExp>>;
    export default fields;
}

declare module '../theme-fields' {
    const themeFields: Record<string, unknown>;
    export default themeFields;
}

// The CSS of each screen package, loaded with its component by the lazy screens
declare module '*/assets/css/styles.css';
