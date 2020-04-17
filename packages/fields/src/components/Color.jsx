import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Panel } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import ColorPicker from './ColorPicker';

import styles from '../styles/color.module.scss';

const propTypes = {
    description: PropTypes.string,
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    className: PropTypes.string,
    // closePanel: PropTypes.func,
    panelOpened: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    description: null,
    value: null,
    className: null,
    // closePanel: null,
    panelOpened: false,
    onChange: null,
};

const ColorField = ({ description, value, panelOpened, onChange, className }) => {
    const { color = null, alpha = null } = value || {};
    return (
        <>
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
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
            </div>
            {panelOpened ? (
                <Panel title={description}>
                    <div className={styles.picker}>
                        <ColorPicker value={value} onChange={onChange} />
                    </div>
                </Panel>
            ) : null}
        </>
    );
};

ColorField.propTypes = propTypes;
ColorField.defaultProps = defaultProps;
ColorField.isHorizontal = true;
ColorField.withPanel = true;

export default ColorField;
