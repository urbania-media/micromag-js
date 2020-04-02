import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';
import { getStyleFromFont } from '@micromag/core/utils';

import styles from '../styles/font.module.scss';

const alignIcons = {
    left: faAlignLeft,
    center: faAlignCenter,
    right: faAlignRight,
};

const propTypes = {
    value: PropTypes.shape({
        name: PropTypes.string,
        size: PropTypes.number,
        style: PropTypes.object,
    }),
    gotoForm: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    gotoForm: null,
    className: null,
};

const FontField = ({ value, gotoForm, className }) => {
    const { name = null, size = null, style = null } = value || {};
    const onClickField = useCallback(() => gotoForm('font'), []);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button withoutStyle className={styles.button} onClick={onClickField}>
                {name !== null || size !== null || style !== null ? (
                    <>
                        <span className={styles.name}>{name}</span>
                        {size !== null ? <span className={styles.size}>{size}px</span> : null}
                        {style !== null && Object.keys(style).join(',') !== 'align' ? (
                            <span
                                className={styles.preview}
                                style={{
                                    ...getStyleFromFont(value),
                                    lineHeight: 1,
                                    fontSize: '1.2em',
                                }}
                            >
                                Aa
                            </span>
                        ) : null}

                        {style !== null &&
                        typeof alignIcons[style.align || null] !== 'undefined' ? (
                            <FontAwesomeIcon
                                icon={alignIcons[style.align]}
                                className={styles.icon}
                            />
                        ) : null}
                    </>
                ) : (
                    <span className={styles.noValue}>Sélectionnez une police</span>
                )}
                <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
            </Button>
        </div>
    );
};

FontField.propTypes = propTypes;
FontField.defaultProps = defaultProps;
FontField.isHorizontal = true;

export default FontField;
