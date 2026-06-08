import isEmpty from 'lodash-es/isEmpty';

function usePlaceholderStyle(
    selector: string,
    placeholderStyle: {
        color?: string | null;
        fontSize?: string | null;
        fontStyle?: string | null;
        fontWeight?: string | null;
        fontFamily?: string | null;
        textAlign?: string | null;
    },
): string | null {
    const styles: Record<string, string> | null =
        placeholderStyle !== null
            ? Object.keys(placeholderStyle).reduce((styles, key) => {
                  const value = placeholderStyle[key as keyof typeof placeholderStyle];
                  return !isEmpty(value)
                      ? {
                            ...styles,
                            [key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()]: value,
                        }
                      : styles;
              }, {})
            : null;
    return styles !== null && Object.keys(styles).length > 0
        ? `
        ${selector}::placeholder {
            ${Object.keys(styles)
                .map((key) => `${key}: ${styles[key]};`)
                .join('\n')}
        }
    `
        : null;
}

export default usePlaceholderStyle;
