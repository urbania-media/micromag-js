import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from '../styles/color.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    className: PropTypes.string,
    gotoForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    gotoForm: null,
};

const ColorField = ({ value, className, gotoForm }) => {
    const { color = null, alpha = null } = value || {};
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button withoutStyle className={styles.button} onClick={() => gotoForm('color')}>
                {color !== null || alpha !== null ? (
                    <>
                        <span className={styles.name}>{color}</span>
                        <span className={styles.preview}>
                            <span
                                className={styles.color}
                                style={{
                                    ...getStyleFromColor(value),
                                }}
                            />
                        </span>
                    </>
                ) : (
                    <span className={styles.noValue}>Sélectionnez une couleur</span>
                )}
                <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
            </Button>
        </div>
    );
};

ColorField.propTypes = propTypes;
ColorField.defaultProps = defaultProps;
ColorField.isHorizontal = true;

export default ColorField;
