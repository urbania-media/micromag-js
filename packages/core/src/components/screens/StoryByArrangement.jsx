/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

const placeholderSize = { width: 100, height: 150 };
const previewSize = { width: 320, height: 480 };

const cardProps = { spacing: 4 };

const getComponentByArrangement = (arrangement, component, props = {}) => {
    const arrangementProps = arrangement.props || {};
    const Component = component || null;
    const gridProps = arrangementProps.grid || null;
    return Component !== null ? (
        <Component
            {...arrangementProps}
            {...props}
            grid={{
                ...gridProps,
                ...cardProps,
            }}
        />
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
};

const defaultProps = {
    arrangement: {},
    itemProps: {
        isPlaceholder: false,
        isPreview: false,
    },
};

const StoryByArrangement = ({ arrangement, component, itemProps }) => {
    const { isPlaceholder, isPreview } = itemProps;
    // console.log(arrangement, 'ip', itemProps);
    return (
        <Story {...(isPlaceholder ? placeholderSize : null)} {...(isPreview ? previewSize : null)}>
            {getComponentByArrangement(arrangement, component, itemProps)}
        </Story>
    );
};

StoryByArrangement.propTypes = propTypes;
StoryByArrangement.defaultProps = defaultProps;

export default StoryByArrangement;
