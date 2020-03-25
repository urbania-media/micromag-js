/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

const getComponentByLayout = (layout, component, props = {}, layoutProps = {}) => {
    const defaultLayoutProps = layout.props || {};
    const isPlaceholder = !!props.isPlaceholder; // eslint-disable-line react/destructuring-assignment, react/prop-types
    const Component = component || null;
    let otherProps = {};
    if (layoutProps && defaultLayoutProps.grid) {
        otherProps = {
            grid: {
                ...defaultLayoutProps.grid,
                ...layoutProps,
                ...(isPlaceholder ? { spacing: 4 } : null),
            },
        };
    }
    if (layoutProps && defaultLayoutProps.box) {
        otherProps = {
            box: {
                ...defaultLayoutProps.box,
                ...layoutProps,
                ...(isPlaceholder ? { spacing: 4 } : null),
            },
        };
    }
    return Component !== null ? (
        <Component {...defaultLayoutProps} {...props} {...otherProps} />
    ) : null;
};

const propTypes = {
    layout: PropTypes.shape({
        name: PropTypes.string,
        props: PropTypes.object,
    }),
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    storyProps: PropTypes.shape({
        isPlaceholder: PropTypes.bool,
        isPreview: PropTypes.bool,
    }),
    layoutProps: PropTypes.shape({
        spacing: PropTypes.number,
    }),
};

const defaultProps = {
    layout: {},
    storyProps: {
        isPlaceholder: false,
        isPreview: false,
    },
    layoutProps: null,
};

const StoryByLayout = ({ layout, component, storyProps, layoutProps }) => {
    const { isPlaceholder, isPreview } = storyProps;
    return (
        <Story isPlaceholder={isPlaceholder} isPreview={isPreview}>
            {getComponentByLayout(
                layout,
                component,
                { ...storyProps, isPlaceholder, isPreview },
                layoutProps,
            )}
        </Story>
    );
};

StoryByLayout.propTypes = propTypes;
StoryByLayout.defaultProps = defaultProps;

export default StoryByLayout;
