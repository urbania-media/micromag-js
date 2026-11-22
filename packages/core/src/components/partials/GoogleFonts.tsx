import React from 'react';

import { getGoogleFontsUrl } from '../../utils';

interface GoogleFontsProps {
    fonts?: unknown[] | null;
    display?: string | null;
}

/**
 * Declares the Google fonts of a story with the Google Fonts stylesheet. Like the `@font-face`
 * rules of `FontFaces`, the browser only downloads the files of the fonts that text uses.
 */
function GoogleFonts({ fonts = null, display = 'swap' }: GoogleFontsProps) {
    const url = getGoogleFontsUrl(fonts, { display });
    if (url === null) {
        return null;
    }
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={url} />
        </>
    );
}

export default GoogleFonts;
