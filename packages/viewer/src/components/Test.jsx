/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useResizeObserver } from '@micromag/core/hooks';
import MenuIcon from './menus/MenuIcon';

import styles from '../styles/test.module.scss';

const propTypes = {
    test: PropTypes.bool,
    text: MicromagPropTypes.text,
};

const defaultProps = {
    test: false,
    text: null,
};

const Test = ({ test, text }) => {
    const [testState, setTestState] = useState(false);
    // const {
    //     ref: testRef,
    //     entry: { contentRect: testRect },
    // } = useResizeObserver();
    // console.log(testRect);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.oui]: test,
                    [styles.non]: !test,
                },
            ])}
        >
            {test ? 'oui' : 'non'}
            {text}
            <MenuIcon />
        </div>
    );
};

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

export default Test;
