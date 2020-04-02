/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { title, description } from '../../../../.storybook/data';

import SurveyCheckboxComponent from '../SurveyCheckboxComponent';

const propTypes = {
    items: PropTypes.shape({
        heading: MicromagPropTypes.text,
    }),
    background: PropTypes.shape({
        image: MicromagPropTypes.image,
    }),
};

const defaultProps = {
    items: [
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
    ],
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

const SurveyMain = ({ items, background, ...otherProps }) => {
    return <SurveyCheckboxComponent items={items} background={background} {...otherProps} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
