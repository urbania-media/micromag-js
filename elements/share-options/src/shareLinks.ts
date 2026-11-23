/**
 * The share links of the networks of the share options, the same as `react-share` builds them
 */
const toQueryString = (params: Record<string, string | null | undefined>): string => {
    const pairs = Object.keys(params)
        .filter((key) => params[key] !== null && typeof params[key] !== 'undefined')
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`);
    return pairs.length > 0 ? `?${pairs.join('&')}` : '';
};

const withTitle = (url: string, title: string | null, separator = ' ') =>
    title ? `${title}${separator}${url}` : url;

export const getFacebookLink = (url: string) =>
    `https://www.facebook.com/sharer/sharer.php${toQueryString({ u: url })}`;

export const getTwitterLink = (url: string, title: string | null = null) =>
    `https://twitter.com/intent/tweet${toQueryString({ url, text: title })}`;

export const getLinkedinLink = (url: string, title: string | null = null) =>
    `https://linkedin.com/shareArticle${toQueryString({ url, mini: 'true', title })}`;

export const getWhatsappLink = (url: string, title: string | null = null) =>
    `https://api.whatsapp.com/send${toQueryString({ text: withTitle(url, title) })}`;

export const getEmailLink = (url: string, subject: string | null = null) =>
    `mailto:${toQueryString({ subject, body: url })}`;

/**
 * Opens a share dialog centered on the window, like `react-share`, and calls `onClose` once it is
 * closed
 */
export const openShareWindow = (
    link: string,
    { width, height }: { width: number; height: number },
    onClose: (() => void) | null = null,
) => {
    const left = window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2;
    const top = window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2;
    const config = {
        height,
        width,
        left,
        top,
        location: 'no',
        toolbar: 'no',
        status: 'no',
        directories: 'no',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        centerscreen: 'yes',
        chrome: 'yes',
    };
    const shareDialog = window.open(
        link,
        '',
        Object.keys(config)
            .map((key) => `${key}=${config[key]}`)
            .join(', '),
    );
    if (onClose !== null) {
        const interval = window.setInterval(() => {
            if (shareDialog === null || shareDialog.closed) {
                window.clearInterval(interval);
                onClose();
            }
        }, 1000);
    }
    return shareDialog;
};
