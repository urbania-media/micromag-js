/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder } from '@micromag/core/components';
import { useScreenDefinition } from '@micromag/core/contexts';

import Radios from './Radios';

import styles from '../styles/layout.module.scss';

const propTypes = {
    // layouts: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    // layouts: [],
    value: null,
    className: null,
    onChange: null,
};

const ScreenLayoutField = ({ value, className, onChange }) => {
    const { id, layouts = [] } = useScreenDefinition();

    return (layouts || []).length > 1 ? (
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
    ) : null;
};

ScreenLayoutField.propTypes = propTypes;
ScreenLayoutField.defaultProps = defaultProps;

export default ScreenLayoutField;
