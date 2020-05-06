import PropTypes from 'prop-types';
import { snakeCase } from 'snake-case';

/**
 * Core
 */
export const history = PropTypes.shape({
    listen: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
});

export const intl = PropTypes.shape({
    locale: PropTypes.string.isRequired,
    formatMessage: PropTypes.func.isRequired,
});

export const message = PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
});

export const text = PropTypes.oneOfType([message, PropTypes.string]);

export const label = PropTypes.oneOfType([message, PropTypes.node]);

export const statusCode = PropTypes.oneOf([401, 403, 404, 500]);

export const ref = PropTypes.oneOfType([
    PropTypes.shape({
        current: PropTypes.any,
    }),
    PropTypes.func,
]);

export const target = PropTypes.oneOf(['_blank', '_self', '_parent']);

export const interaction = PropTypes.oneOf(['tap', 'swipe']);

export const interactions = PropTypes.arrayOf(interaction);

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

export const buttonTheme = PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
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

export const dropdownAlign = PropTypes.oneOf(['left', 'right']);

export const componentNames = Components =>
    PropTypes.oneOf(Object.keys(Components).map(it => snakeCase(it)));

export const component = PropTypes.oneOfType([PropTypes.object, PropTypes.func]);
export const components = PropTypes.objectOf(component);

/**
 * Forms
 */
export const errors = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);
export const formErrors = PropTypes.objectOf(errors);

export const selectOption = PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
});
export const selectOptions = PropTypes.arrayOf(selectOption);

export const formField = PropTypes.shape({
    name: PropTypes.string,
    component: PropTypes.string,
});
export const formFields = PropTypes.arrayOf(formField);

/**
 * Style
 */
export const textAlign = PropTypes.oneOf(['left', 'right', 'center']);

export const textStyle = PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontStyle: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
    }),
    textAlign,
});

export const color = PropTypes.shape({
    color: PropTypes.string,
    alpha: PropTypes.number,
});

export const margin = PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
});

export const gridLayout = PropTypes.arrayOf(
    PropTypes.shape({
        rows: PropTypes.number,
        columns: PropTypes.arrayOf(PropTypes.number),
    }),
);

export const videoControl = PropTypes.shape({
    visible: PropTypes.bool,
    color,
});

export const videoControls = PropTypes.shape({
    timeline: videoControl,
    progress: videoControl,
    volume: videoControl,
});

export const objectFitSize = PropTypes.oneOf(['cover', 'contain']);

export const objectFit = PropTypes.shape({
    size: objectFitSize,
});

export const flexDirection = PropTypes.oneOf(['row', 'column']);

export const axisAlign = PropTypes.oneOf(['top', 'center', 'bottom', 'between', 'around', 'even']);

export const crossAlign = PropTypes.oneOf(['top', 'center', 'bottom', 'stretch']);

/**
 * Content
 */
const mediaShape = {
    id: PropTypes.string,
    type: PropTypes.string,
    thumbnail_url: PropTypes.string,
    name: PropTypes.string,
    filename: PropTypes.string,
    size: PropTypes.number,
    metadata: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        duration: PropTypes.number,
    }),
};

export const media = PropTypes.shape(mediaShape);
export const medias = PropTypes.arrayOf(media);

export const image = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['image']),
    metadata: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
});
export const images = PropTypes.arrayOf(image);

export const video = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['video']),
    metadata: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        duration: PropTypes.number,
    }),
});
export const videos = PropTypes.arrayOf(video);

export const audio = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['audio']),
    metadata: PropTypes.shape({
        duration: PropTypes.number,
    }),
});
export const audios = PropTypes.arrayOf(audio);

/**
 * Elements
 */
export const headingElement = PropTypes.shape({
    body: PropTypes.string,
    textStyle,
});

export const textElement = PropTypes.shape({
    body: PropTypes.string,
    textStyle,
});

export const imageElement = PropTypes.shape({
    image,
});

export const videoElement = PropTypes.shape({
    video,
});

export const backgroundElement = PropTypes.shape({
    color,
    image,
});

export const boxElement = PropTypes.shape({
    direction: flexDirection,
    axisAlign,
    crossAlign,
    spacing: PropTypes.number,
});

export const gridElement = PropTypes.shape({
    layout: PropTypes.array,
    spacing: PropTypes.number,
});

export const audioParams = PropTypes.shape({
    muted: PropTypes.boolean,
    autoPlay: PropTypes.boolean,
    loop: PropTypes.boolean,
    native: PropTypes.boolean,
});

/**
 * Story
 */
const schemaBaseShape = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
};
export const componentType = PropTypes.shape({
    ...schemaBaseShape,
    id: PropTypes.string.isRequired,
    properties: PropTypes.objectOf(schemaBaseShape),
});
export const componentTypes = PropTypes.arrayOf(componentType);

export const storyComponent = PropTypes.shape({
    type: PropTypes.string.isRequired,
});
export const storyComponents = PropTypes.arrayOf(storyComponent);

export const story = PropTypes.shape({
    components: storyComponents,
});

export const screenType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    layouts: PropTypes.arrayOf(PropTypes.string),
});

export const screenTypes = PropTypes.arrayOf(screenType);

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
});

/**
 * Screens
 */

export const adFormats = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
});

export const renderFormat = PropTypes.oneOf(['view', 'placeholder', 'edit', 'preview']);

export const adFormat = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    target,
    iframe: PropTypes.string,
    image,
});

export const audioComponent = PropTypes.shape({
    src: PropTypes.string,
    track: PropTypes.string,
    trackLng: PropTypes.number,
    controls: PropTypes.bool,
});

export const slide = PropTypes.shape({
    image,
    text: textElement,
});

export const slides = PropTypes.arrayOf(slide);
