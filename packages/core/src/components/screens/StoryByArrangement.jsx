/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

const placeholderSize = { width: 100, height: 150 };
const previewSize = { width: 320, height: 480 };

const getComponentByArrangement = (arrangement, component, props = {}, layoutProps = {}) => {
    const arrangementProps = arrangement.props || {};
    const Component = component || null;
    let otherProps = {};
    if (layoutProps && arrangementProps.grid) {
        otherProps = {
            grid: {
                ...arrangementProps.grid,
                ...layoutProps,
            },
        };
    }
    if (layoutProps && arrangementProps.box) {
        otherProps = {
            box: {
                ...arrangementProps.box,
                ...layoutProps,
            },
        };
    }

    return Component !== null ? (
        <Component {...arrangementProps} {...props} {...otherProps} />
    ) : null;
};

const propTypes = {
    arrangement: PropTypes.shape({
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
    arrangement: {},
    itemProps: {
        isPlaceholder: false,
        isPreview: false,
    },
    layoutProps: null,
};

const StoryByArrangement = ({ arrangement, component, itemProps, layoutProps }) => {
    const { isPlaceholder, isPreview } = itemProps;
    return (
        <Story {...(isPlaceholder ? placeholderSize : null)} {...(isPreview ? previewSize : null)}>
            {getComponentByArrangement(arrangement, component, itemProps, layoutProps)}
        </Story>
    );
};

StoryByArrangement.propTypes = propTypes;
StoryByArrangement.defaultProps = defaultProps;

export default StoryByArrangement;
