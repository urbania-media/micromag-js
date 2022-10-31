/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScreenPlaceholder } from '@micromag/core/components';
import { useScreenDefinition } from '@micromag/core/contexts';

import Radios from './Radios';

import styles from '../styles/layout.module.scss';

const propTypes = {
    value: PropTypes.string,
    screenState: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    screenState: null,
    className: null,
    onChange: null,
};

const ScreenLayoutField = ({ value, screenState, className, onChange, ...props }) => {
    const { id, layouts = [] } = useScreenDefinition();

    return (
        <Radios
            options={layouts.map((layout) => ({
                value: layout,
                label: (
                    <div className={styles.layout}>
                        <ScreenPlaceholder
                            screen={{
                                type: id,
                                layout,
                            }}
                            screenState={screenState}
                            withSize
                            className={styles.screen}
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
