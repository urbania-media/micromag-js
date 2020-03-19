/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Text from '@micromag/component-text';
import Grid from '@micromag/component-grid';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
// import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.text,
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
        ],
        spacing: 2,
    },
    textAlign: 'center',
    isPlaceholder: false,
    isPreview: true,
    className: null,
};

const TextLayout = ({ text, grid, textAlign, isPlaceholder, isPreview, className }) => {
    const { layout, spacing } = grid;

    const item = isPlaceholder ? (
        <Placeholders.Text height={0.5} lines={4} className={styles.placeholder} />
    ) : (
        <Text {...text} className={styles.text} />
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                <Grid
                    layout={layout}
                    spacing={spacing || 0}
                    items={[item]}
                    className={styles.grid}
                />
            </div>
        </div>
    );
};

TextLayout.propTypes = propTypes;
TextLayout.defaultProps = defaultProps;

export default TextLayout;
