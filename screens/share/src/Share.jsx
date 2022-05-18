/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { FormattedMessage } from 'react-intl';
// import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
// import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
// import { isTextFilled } from '@micromag/core/utils';
// import Background from '@micromag/element-background';
// import CallToAction from '@micromag/element-call-to-action';
// import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
// import Layout, { Spacer } from '@micromag/element-layout';
// import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    // layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    // text: MicromagPropTypes.textElement,
    heading: MicromagPropTypes.headingElement,
    // @todo
    options: PropTypes.any, // eslint-disable-line
    // withTitle: PropTypes.bool,
    // spacing: PropTypes.number,
    // background: MicromagPropTypes.backgroundElement,
    // callToAction: MicromagPropTypes.callToAction,
    // current: PropTypes.bool,
    // active: PropTypes.bool,
    // transitions: MicromagPropTypes.transitions,
    // transitionStagger: PropTypes.number,
    // enableInteraction: PropTypes.func,
    // disableInteraction: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'top',
    // text: null,
    heading: null,
    options: null,
    // withTitle: false,
    // spacing: 20,
    // background: null,
    // callToAction: null,
    // current: true,
    // active: true,
    // transitions: null,
    // transitionStagger: 100,
    // enableInteraction: null,
    // disableInteraction: null,
    className: null,
};

const ShareScreen = ({
    // layout,
    // text,
    heading,
    options,
    // withTitle,
    // spacing,
    // background,
    // callToAction,
    // current,
    // active,
    // transitions,
    // transitionStagger,
    // enableInteraction,
    // disableInteraction,
    className,
}) => {
    console.log({heading, options}); // eslint-disable-line

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    // [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Heading body={heading} />
            HERE BE SHARING OPTIONS
        </div>
    );
};

ShareScreen.propTypes = propTypes;
ShareScreen.defaultProps = defaultProps;

export default React.memo(ShareScreen);
