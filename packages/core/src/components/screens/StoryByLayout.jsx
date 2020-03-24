/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

const placeholderSize = { width: 100, height: 150 };
const previewSize = { width: 320, height: 480 };

const getComponentByLayout = (layout, component, props = {}, customLayoutProps = {}) => {
    const layoutProps = layout.props || {};
    const Component = component || null;
    let otherProps = {};
    if (customLayoutProps && layoutProps.grid) {
        otherProps = {
            grid: {
                ...layoutProps.grid,
                ...customLayoutProps,
            },
        };
    }
    if (customLayoutProps && layoutProps.box) {
        otherProps = {
            box: {
                ...layoutProps.box,
                ...customLayoutProps,
            },
        };
    }

    return Component !== null ? <Component {...layoutProps} {...props} {...otherProps} /> : null;
};

const propTypes = {
    layout: PropTypes.shape({
        name: PropTypes.string,
        props: PropTypes.object,
    }),
    component: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    itemProps: PropTypes.shape({
        isPlaceholder: PropTypes.bool,
        isPreview: PropTypes.bool,
    }),
    layoutProps: PropTypes.shape({
        spacing: PropTypes.number,
    }),
};

const defaultProps = {
    layout: {},
    itemProps: {
        isPlaceholder: false,
        isPreview: false,
    },
    layoutProps: null,
};

const StoryByLayout = ({ layout, component, itemProps, layoutProps }) => {
    const { isPlaceholder, isPreview } = itemProps;
    return (
        <Story {...(isPlaceholder ? placeholderSize : null)} {...(isPreview ? previewSize : null)}>
            {getComponentByLayout(layout, component, itemProps, layoutProps)}
        </Story>
    );
};

StoryByLayout.propTypes = propTypes;
StoryByLayout.defaultProps = defaultProps;

export default StoryByLayout;
