/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder } from '@micromag/core/components';

import Radios from './Radios';

import styles from '../styles/layout.module.scss';

const propTypes = {
    screenType: PropTypes.string,
    layouts: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    screenType: 'title',
    layouts: [],
    value: null,
    className: null,
    onChange: null,
};

const ScreenLayoutField = ({ screenType: type, layouts, value, className, onChange }) => {
    // console.log('screenlay', props);
    return (
        <Radios
            options={layouts.map((layout) => ({
                value: layout,
                label: (
                    <div className={styles.layout}>
                        <ScreenPlaceholder
                            screen={{
                                type,
                                layout,
                            }}
                            width={80}
                            height={120}
                        />
                    </div>
                ),
            }))}
            value={value || (layouts ? layouts[0] : null)}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            buttonClassName={styles.button}
            onChange={onChange}
        />
    );
};

ScreenLayoutField.propTypes = propTypes;
ScreenLayoutField.defaultProps = defaultProps;

export default ScreenLayoutField;
