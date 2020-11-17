/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Creatable from 'react-select/creatable';

// import * as AppPropTypes from '../../lib/PropTypes';
// import Select from './Select';

import styles from '../styles/font-size.module.scss';

const propTypes = {
    value: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    sizes: [12, 24, 36, 48, 72, 96, 128],
    className: null,
    onChange: null,
};

const FontSize = ({ value, sizes, className, onChange }) => {
    const onSelectChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue !== null ? newValue.value : null);
            }
        },
        [onChange],
    );
    const options = useMemo(
        () =>
            sizes.map((it) => ({
                label: it,
                value: it,
            })),
        [sizes],
    );
    return (
        <Creatable
            options={options}
            value={value !== null ? options.find((it) => it.value === value) : null}
            placeholder={
                <FormattedMessage defaultMessage="Size" description="Placeholder of font size" />
            }
            formatCreateLabel={(newValue) => (
                <FormattedMessage
                    defaultMessage="Add {value}"
                    description="Create label in font size"
                    values={{
                        value: newValue,
                    }}
                />
            )}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            styles={{
                control: (base) => ({
                    ...base,
                    height: 30,
                    minHeight: 30,
                }),
                valueContainer: (base) => ({
                    ...base,
                    height: 30,
                }),

                // input: (base) => ({
                //     ...base,
                //     margin: 0,
                // }),
                indicatorsContainer: (base) => ({
                    ...base,
                    height: 30,
                }),
            }}
            onChange={onSelectChange}
        />
    );
};

FontSize.propTypes = propTypes;
FontSize.defaultProps = defaultProps;
FontSize.isHorizontal = true;

export default FontSize;
