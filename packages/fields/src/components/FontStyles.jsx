/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
} from '@fortawesome/free-solid-svg-icons';

import Checkboxes from './Checkboxes';
import Radios from './Radios';

import styles from '../styles/font-styles.module.scss';

const propTypes = {
    styles: PropTypes.arrayOf(PropTypes.object),
    align: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        align: PropTypes.oneOf(['left', 'center', 'right']),
    }),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    styles: [
        { value: 'bold', label: <FontAwesomeIcon icon={faBold} /> },
        { value: 'italic', label: <FontAwesomeIcon icon={faItalic} /> },
        { value: 'underline', label: <FontAwesomeIcon icon={faUnderline} /> },
    ],
    align: [
        { value: 'left', label: <FontAwesomeIcon icon={faAlignLeft} /> },
        { value: 'center', label: <FontAwesomeIcon icon={faAlignCenter} /> },
        { value: 'right', label: <FontAwesomeIcon icon={faAlignRight} /> },
    ],
    value: null,
    className: null,
    onChange: null,
};

const FontStyles = ({ styles: stylesOptions, align, value, className, onChange }) => {
    const stylesKeys = stylesOptions.map(it => it.value);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Checkboxes
                options={stylesOptions}
                value={
                    value !== null
                        ? Object.keys(value)
                              .filter(key => stylesKeys.indexOf(key) !== -1)
                              .reduce(
                                  (values, style) => (value[style] ? [...values, style] : values),
                                  [],
                              )
                        : null
                }
                className={styles.style}
                onChange={newValue => {
                    if (onChange !== null) {
                        onChange(
                            newValue !== null
                                ? newValue.reduce(
                                      (map, style) => ({
                                          ...map,
                                          [style]: true,
                                      }),
                                      omit(value, stylesKeys),
                                  )
                                : omit(value, stylesKeys),
                        );
                    }
                }}
            />
            <Radios
                options={align}
                className={styles.align}
                value={value !== null ? value.align || null : null}
                onChange={newValue => {
                    if (onChange !== null) {
                        onChange(
                            newValue !== null
                                ? {
                                      ...value,
                                      align: newValue,
                                  }
                                : omit(value, ['align']),
                        );
                    }
                }}
            />
        </div>
    );
};

FontStyles.propTypes = propTypes;
FontStyles.defaultProps = defaultProps;

export default FontStyles;
