import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromText } from '@micromag/core/utils';

import styles from '../styles/font.module.scss';

const alignIcons = {
    left: faAlignLeft,
    center: faAlignCenter,
    right: faAlignRight,
};

const propTypes = {
    value: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    className: null,
};

const FontField = ({ value, className }) => {
    const { fontFamily = null, fontSize = null, fontStyle = null } = value || {};
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {fontFamily !== null || fontSize !== null || fontStyle !== null ? (
                <>
                    <span className={styles.name}>{fontFamily}</span>
                    {fontSize !== null ? <span className={styles.size}>{fontSize}px</span> : null}
                    {fontStyle !== null && Object.keys(fontStyle).join(',') !== 'align' ? (
                        <span
                            className={styles.preview}
                            style={{
                                ...getStyleFromText(value),
                                lineHeight: 1,
                                fontSize: '1.2em',
                            }}
                        >
                            Aa
                        </span>
                    ) : null}
                    {fontStyle !== null &&
                    typeof alignIcons[fontStyle.align || null] !== 'undefined' ? (
                        <FontAwesomeIcon
                            icon={alignIcons[fontStyle.align]}
                            className={styles.icon}
                        />
                    ) : null}
                </>
            ) : (
                <span className={styles.noValue}>Sélectionnez une police</span>
            )}
        </div>
    );
};

FontField.propTypes = propTypes;
FontField.defaultProps = defaultProps;
FontField.withForm = true;

export default FontField;
