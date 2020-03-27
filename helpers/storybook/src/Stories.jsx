/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import StoryByLayout from './StoryByLayout';

const propTypes = {
    layouts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            props: PropTypes.object,
        }),
    ),
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    storyProps: PropTypes.shape({
        isPlaceholder: PropTypes.bool,
        isPreview: PropTypes.bool,
    }),
    layoutProps: PropTypes.shape({
        spacing: PropTypes.number,
    }),
    flex: PropTypes.bool,
};

const defaultProps = {
    layouts: [],
    storyProps: {
        isPlaceholder: false,
        isPreview: false,
    },
    layoutProps: null,
    flex: true,
};

const Stories = ({ layouts, component, storyProps, layoutProps, flex }) => {
    const items = layouts.map(layout => (
        <StoryByLayout
            key={layout.name}
            layout={layout}
            component={component}
            storyProps={storyProps}
            layoutProps={layoutProps}
        />
    ));
    return flex ? (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>{items}</div>
    ) : (
        items
    );
};

Stories.propTypes = propTypes;
Stories.defaultProps = defaultProps;

export default Stories;
