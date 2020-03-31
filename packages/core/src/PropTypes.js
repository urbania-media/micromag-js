import PropTypes from 'prop-types';
import { snakeCase } from 'snake-case';

/**
 * Core
 */
export const urlGenerator = PropTypes.shape({
    route: PropTypes.func.isRequired,
});

export const history = PropTypes.shape({
    listen: PropTypes.func.isRequired,
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
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
});

export const modals = PropTypes.arrayOf(modal);

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

export const componentNames = Components =>
    PropTypes.oneOf(Object.keys(Components).map(it => snakeCase(it)));

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
export const fontStyle = PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
    }),
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

/**
 * Content
 */
export const video = PropTypes.shape({
    url: PropTypes.string.isRequired,
});
export const videos = PropTypes.arrayOf(video);

export const image = PropTypes.shape({
    url: PropTypes.string.isRequired,
});
export const images = PropTypes.arrayOf(image);

/**
 * Components
 */
export const headingStyle = PropTypes.shape({
    font: fontStyle,
    color,
    margin,
});

export const headingComponent = PropTypes.shape({
    body: PropTypes.string,
    style: headingStyle,
});

export const textStyle = PropTypes.shape({
    font: fontStyle,
    color,
    margin,
});

export const textComponent = PropTypes.shape({
    body: PropTypes.string,
    style: textStyle,
});

export const imageComponent = PropTypes.shape({
    image,
});

export const backgroundComponent = PropTypes.shape({
    color,
    image,
});

export const flexDirection = PropTypes.oneOf(['row', 'column']);

export const axisAlign = PropTypes.oneOf(['top', 'center', 'bottom', 'between', 'around', 'even']);

export const crossAlign = PropTypes.oneOf(['top', 'center', 'bottom', 'stretch']);

export const box = PropTypes.shape({
    direction: flexDirection,
    axisAlign,
    crossAlign,
    spacing: PropTypes.number,
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

export const component = PropTypes.shape({
    type: PropTypes.string.isRequired,
});
export const components = PropTypes.arrayOf(component);

export const story = PropTypes.shape({
    components,
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

export const fieldType = PropTypes.oneOf(['text', 'heading', 'image', 'audio', 'video', 'map']);

export const fieldTypes = PropTypes.arrayOf(fieldType);

export const renderFormat = PropTypes.oneOf(['view', 'placeholder', 'edit', 'preview']);
