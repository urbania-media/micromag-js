const usePlaceholderStyle = (className, placeholderStyle) => `
            .${className}::placeholder {
                ${placeholderStyle.color ? `color: ${placeholderStyle.color};` : ''}
                ${placeholderStyle.fontSize ? `font-size: ${placeholderStyle.fontSize};` : ''}
                ${placeholderStyle.fontStyle ? `font-style: ${placeholderStyle.fontStyle};` : ''}
                ${placeholderStyle.fontWeight ? `font-weight: ${placeholderStyle.fontWeight};` : ''}
                ${placeholderStyle.fontFamily ? `font-family: ${placeholderStyle.fontFamily};` : ''}
                ${placeholderStyle.textAlign ? `text-align: ${placeholderStyle.textAlign};` : ''}
            }
        `;

export default usePlaceholderStyle;
