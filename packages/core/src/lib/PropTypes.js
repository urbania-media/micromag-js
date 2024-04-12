import { snakeCase } from 'change-case';
import PropTypes from 'prop-types';

/**
 * Core
 */
export const history = PropTypes.shape({
    listen: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
});

export const location = PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
});

export const intl = PropTypes.shape({
    locale: PropTypes.string.isRequired,
    formatMessage: PropTypes.func.isRequired,
});

export const defaultMessageContent = PropTypes.shape({
    type: PropTypes.number,
    value: PropTypes.string,
});

export const defaultMessage = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(defaultMessageContent),
]);

export const message = PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: defaultMessage.isRequired,
    description: PropTypes.string,
});

export const text = PropTypes.oneOfType([message, PropTypes.string]);

export const label = PropTypes.oneOfType([message, PropTypes.node]);

export const statusCode = PropTypes.oneOf([401, 403, 404, 500]);

export const ref = PropTypes.oneOfType([
    PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    }),
    PropTypes.func,
]);

export const target = PropTypes.oneOf(['_blank', '_self', '_parent']);

export const interaction = PropTypes.oneOf(['tap', 'swipe']);

export const interactions = PropTypes.arrayOf(interaction);

export const trackingVariables = PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
);

export const progress = PropTypes.shape({
    currentTime: PropTypes.number,
    duration: PropTypes.number,
});

/**
 * Site
 */
export const user = PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    birthdate: PropTypes.string,
});

export const menuItem = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label,
    url: PropTypes.string,
    external: PropTypes.bool,
    active: PropTypes.bool,
});
export const menuItems = PropTypes.arrayOf(menuItem);

export const breadcrumb = PropTypes.shape({
    label,
    url: PropTypes.string,
});
export const breadcrumbs = PropTypes.arrayOf(breadcrumb);

export const device = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const devices = PropTypes.arrayOf(device);

export const modal = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const modals = PropTypes.arrayOf(modal);

export const panel = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const panels = PropTypes.arrayOf(panel);

export const button = PropTypes.shape({
    label,
    onClick: PropTypes.func,
});
export const buttons = PropTypes.arrayOf(button);

const bootstrapThemeStrings = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
];

export const bootstrapThemes = PropTypes.oneOf(bootstrapThemeStrings);

export const buttonTheme = PropTypes.oneOf([
    ...bootstrapThemeStrings,
    'outline-primary',
    'outline-secondary',
    'outline-success',
    'outline-danger',
    'outline-warning',
    'outline-info',
    'outline-light',
    'outline-dark',
    'outline-link',
    null,
]);

export const buttonSize = PropTypes.oneOf(['lg', 'sm', null]);

export const formControlSize = PropTypes.oneOf(['lg', 'sm', null]);

export const dropdownAlign = PropTypes.oneOf(['start', 'end']);

export const componentNames = (Components) =>
    PropTypes.oneOf(Object.keys(Components).map((it) => snakeCase(it)));

export const component = PropTypes.oneOfType([PropTypes.object, PropTypes.func]);
export const components = PropTypes.objectOf(component);

/**
 * Forms
 */
export const errors = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);
export const formErrors = PropTypes.objectOf(errors);

export const selectOption = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        value: PropTypes.any, // eslint-disable-line
        label,
    }),
]);
export const selectOptions = PropTypes.arrayOf(selectOption);

export const formField = PropTypes.shape({
    name: PropTypes.string,
    component,
});
export const formFields = PropTypes.arrayOf(formField);

/**
 * Medias
 */
const mediaMetadataShape = {
    filename: PropTypes.string,
    size: PropTypes.number,
    mime: PropTypes.string,
};

export const mediaFile = PropTypes.shape({
    id: PropTypes.string,
    handle: PropTypes.string,
    type: PropTypes.string,
    mime: PropTypes.string,
    url: PropTypes.string,
});

const mediaShape = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    url: PropTypes.string, // .isRequired,
    thumbnail_url: PropTypes.string,
    name: PropTypes.string,
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
    }),
    files: PropTypes.objectOf(mediaFile),
};

export const media = PropTypes.shape(mediaShape);
export const medias = PropTypes.arrayOf(media);

export const mediaTypes = PropTypes.oneOf(['image', 'video', 'audio', 'closed-captions', 'font']);

export const imageMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['image', 'video']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
});
export const imageMedias = PropTypes.arrayOf(imageMedia);

export const fontMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['font']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
    }),
});
export const fontMedias = PropTypes.arrayOf(fontMedia);

export const videoMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['video']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        width: PropTypes.number,
        height: PropTypes.number,
        duration: PropTypes.number,
    }),
});
export const videoMedias = PropTypes.arrayOf(videoMedia);

export const audioMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['audio']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        duration: PropTypes.number,
    }),
});
export const audioMedias = PropTypes.arrayOf(audioMedia);

export const closedCaptionsMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['closed-captions']),
});

/**
 * Style
 */

export const customFont = PropTypes.shape({
    type: PropTypes.oneOf(['system', 'google', 'custom']),
    name: PropTypes.string,
    media: fontMedia,
});

export const font = PropTypes.oneOfType([PropTypes.object, PropTypes.string]);

export const fonts = PropTypes.arrayOf(font);

export const textAlign = PropTypes.oneOf(['left', 'right', 'center']);

export const colorObject = PropTypes.shape({
    color: PropTypes.string,
    alpha: PropTypes.number,
});

const color = PropTypes.oneOfType([colorObject, PropTypes.string]);

export const textStyle = PropTypes.shape({
    fontFamily: font,
    fontSize: PropTypes.number,
    fontStyle: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        upperCase: PropTypes.bool,
    }),
    align: textAlign,
    color,
    letterSpacing: PropTypes.number,
    lineHeight: PropTypes.number,
});

export const borderTypes = PropTypes.oneOf([
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
    'hidden',
]);

export const shadowType = PropTypes.shape({
    shadowDistance: PropTypes.number,
    shadowBlur: PropTypes.number,
    shadowColor: color,
});

export const borderStyle = PropTypes.shape({
    width: PropTypes.number,
    style: borderTypes,
    radius: PropTypes.number,
    color,
});

export const boxStyle = PropTypes.shape({
    backgroundColor: color,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: color,
    borderStyle: borderTypes,
    shadow: shadowType,
});

export const margin = PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
});

export const gridLayout = PropTypes.arrayOf(
    PropTypes.shape({
        rows: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
        columns: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    }),
);

export const objectFitSize = PropTypes.oneOf(['cover', 'contain', null]);

export const objectFit = PropTypes.shape({
    fit: objectFitSize,
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
});

/**
 * Elements
 */

export const textElement = PropTypes.shape({
    body: PropTypes.string,
    textStyle,
});

export const headingElement = textElement;

export const inputElement = PropTypes.shape({
    label: PropTypes.string,
    textStyle,
});

export const imageElement = PropTypes.shape({
    media: imageMedia,
});

export const imageElements = PropTypes.arrayOf(imageElement);

export const videoElement = PropTypes.shape({
    media: videoMedia,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    closedCaptions: closedCaptionsMedia,
    withSeekBar: PropTypes.bool,
    withControls: PropTypes.bool,
});

export const visualElement = PropTypes.shape({
    media: imageMedia,
});

export const visualElements = PropTypes.arrayOf(visualElement);

export const audioElement = PropTypes.shape({
    media: audioMedia,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    closedCaptions: closedCaptionsMedia,
    withPlayPause: PropTypes.bool,
});

export const closedCaptionsElement = PropTypes.shape({
    media: closedCaptionsMedia,
});

export const backgroundElement = PropTypes.shape({
    color,
    image: imageMedia,
    video: videoMedia,
});

export const imageElementWithCaption = PropTypes.shape({
    image: imageMedia,
    caption: textElement,
});

export const imageElementsWithCaption = PropTypes.arrayOf(imageElementWithCaption);

export const stackDirection = PropTypes.oneOf(['horizontal', 'vertical']);
export const stackAlign = PropTypes.oneOf(['start', 'center', 'end']);
export const stackSpacing = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['between', 'evenly', 'around']),
]);

export const stackElement = PropTypes.shape({
    direction: stackDirection,
    align: stackAlign,
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: stackSpacing,
    reverse: PropTypes.bool,
});

export const gridElement = PropTypes.shape({
    layout: PropTypes.arrayOf(PropTypes.string),
    spacing: PropTypes.number,
});

export const geoPosition = PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
});

const markerShape = {
    id: PropTypes.number,
    geoPosition,
    title: headingElement,
    subtitle: headingElement,
    description: textElement,
};

export const marker = PropTypes.shape({
    ...markerShape,
});
export const markers = PropTypes.arrayOf(marker);

export const markerWithImage = PropTypes.shape({
    ...markerShape,
    image: imageMedia,
});
export const markersWithImage = PropTypes.arrayOf(markerWithImage);

export const answerShape = {
    id: PropTypes.string,
    label: textElement,
};

export const answer = PropTypes.shape({
    ...answerShape,
});

export const quizAnswer = PropTypes.shape({
    ...answerShape,
    good: PropTypes.bool,
});

export const answers = PropTypes.arrayOf(answer);
export const quizAnswers = PropTypes.arrayOf(quizAnswer);

export const callToActionTypes = PropTypes.oneOf(['swipe-up', 'button']);

export const callToAction = PropTypes.shape({
    active: PropTypes.bool,
    type: callToActionTypes,
    url: PropTypes.string,
    label: textElement,
    buttonStyle: boxStyle,
});

export const shareIncentive = PropTypes.shape({
    active: PropTypes.bool,
    label: textElement,
    boxStyle,
});

export const activeForm = PropTypes.shape({
    active: PropTypes.bool,
});

export const speaker = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: imageMedia,
    side: PropTypes.oneOf(['left', 'right']),
    color,
});
export const speakers = PropTypes.arrayOf(speaker);

export const conversationMessage = PropTypes.shape({
    speaker: PropTypes.string,
    message: PropTypes.string,
    image: imageMedia,
    audio: audioMedia,
    timingOverrides: PropTypes.shape({
        enabled: PropTypes.bool,
        appearDelay: PropTypes.number,
        writingStateDuration: PropTypes.number,
    }),
});
export const conversationMessages = PropTypes.arrayOf(conversationMessage);

export const conversation = PropTypes.shape({
    speakers,
    textStyle,
    messages: conversationMessages,
});

/**
 * Definitions
 */

const fieldShape = {
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: text,
};

export const field = PropTypes.shape({
    ...fieldShape,
    isSection: PropTypes.bool,
    fields: PropTypes.arrayOf(PropTypes.shape(fieldShape)),
});

export const fields = PropTypes.arrayOf(field);

export const screenDefinition = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['screen']).isRequired,
    title: text.isRequired,
    layouts: PropTypes.arrayOf(PropTypes.string),
    fields,
});

export const screenDefinitions = PropTypes.arrayOf(screenDefinition);

export const fieldDefinition = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['field']).isRequired,
    title: text.isRequired,
    fields,
});

export const fieldDefinitions = PropTypes.arrayOf(fieldDefinition);

/**
 * Components
 */
const storyComponentShape = {
    type: PropTypes.string.isRequired,
};

export const storyComponent = PropTypes.shape({
    ...storyComponentShape,
});
export const storyComponents = PropTypes.arrayOf(storyComponent);

export const screenComponent = PropTypes.shape({
    ...storyComponentShape,
});
export const screenComponents = PropTypes.arrayOf(screenComponent);
export const screen = screenComponent; // @NOTE should be removed

/**
 * Theme
 */
export const theme = PropTypes.shape({
    id: PropTypes.string,
    textStyles: PropTypes.objectOf(textStyle), // renamed to textstyles
    background: backgroundElement,
    colors: PropTypes.objectOf(color),
    components: screenComponents,
});

export const viewerTheme = PropTypes.shape({
    logo: imageMedia,
    ...theme,
});

/**
 * Branding
 */

// export const branding = PropTypes.shape({
//     logo: imageMedia,
//     primaryColor: color,
//     secondaryColor: color,
//     backgroundColor: color,
//     textStyle,
// });

/**
 * Metadata
 */
export const metadata = PropTypes.shape({
    description: PropTypes.string,
    shareUrl: PropTypes.string,
    shareImage: imageMedia,
    favIcon: imageMedia,
});

export const tag = PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

export const tags = PropTypes.arrayOf(tag);

/**
 * Story
 */
export const story = PropTypes.shape({
    id: PropTypes.string,
    theme,
    components: screenComponents,
    metadata,
});

/**
 * Render
 */
export const deviceScreen = PropTypes.shape({
    name: PropTypes.string.isRequired,
    mediaQuery: PropTypes.string,
});

export const deviceScreens = PropTypes.arrayOf(deviceScreen);

export const screenSize = PropTypes.shape({
    screen: PropTypes.string,
    screens: PropTypes.arrayOf(PropTypes.string),
    width: PropTypes.number,
    height: PropTypes.number,
    landscape: PropTypes.bool,
});

export const renderContext = PropTypes.oneOf([
    'view',
    'placeholder',
    'edit',
    'preview',
    'static',
    'capture',
]);

/**
 * Screens
 */

export const adFormats = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
});

export const adFormat = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    target,
    iframe: PropTypes.string,
    image: imageMedia,
});

export const audioComponent = PropTypes.shape({
    src: PropTypes.string,
    track: PropTypes.string,
    trackLng: PropTypes.number,
    controls: PropTypes.bool,
});

export const slide = PropTypes.shape({
    image: imageMedia,
    text: PropTypes.string,
});

export const slides = PropTypes.arrayOf(slide);

// export const imageStyle = PropTypes.shape({
//     alt: PropTypes.string,
//     fit: PropTypes.object,
// });

export const containerStyle = PropTypes.shape({});

/**
 * Transitions
 */

export const transitionName = PropTypes.oneOf(['fade', 'scale', 'slide']);

const transitionParams = {
    duration: PropTypes.number,
    easing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
};

export const transition = PropTypes.oneOfType([
    transitionName.isRequired,
    PropTypes.shape({
        name: transitionName.isRequired,
        ...transitionParams,
    }),
]);

export const transitions = PropTypes.shape({
    in: transition,
    out: transition,
});

/**
 * Search
 */

export const searchFilter = PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

export const searchFilters = PropTypes.arrayOf(searchFilter);

/**
 * Payments
 */

export const paymentItem = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    type: PropTypes.string,
    invoice_link: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const paymentItems = PropTypes.arrayOf(paymentItem);

/**
 * Page Metadada
 */

export const pageMetadata = PropTypes.shape({
    canonical: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    image: PropTypes.shape({
        url: PropTypes.string,
    }),
    favicon: PropTypes.shape({ url: PropTypes.string }),
    rssUrl: PropTypes.string,
    atomUrl: PropTypes.string,
    microformats: PropTypes.arrayOf(PropTypes.shape({})),
});

export const authorElement = PropTypes.shape({
    name: textElement,
    avatar: PropTypes.shape({
        url: PropTypes.string,
    }),
});

export const visitor = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
});

export const badge = PropTypes.shape({
    label: textElement,
    buttonStyle: boxStyle,
});

export const header = PropTypes.shape({
    badge,
});

export const footer = PropTypes.shape({
    callToAction,
});

export const reload = PropTypes.shape();

export const closedCaptions = PropTypes.shape({
    file: closedCaptionsMedia,
    textStyle,
    boxStyle,
});
