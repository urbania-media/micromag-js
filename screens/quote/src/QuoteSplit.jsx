/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Text from '@micromag/component-text';
import Grid from '@micromag/component-grid';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    quote: MicromagPropTypes.textComponent,
    source: MicromagPropTypes.textComponent,
    author: MicromagPropTypes.textComponent,
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
    background: null,
    quote: null,
    author: null,
    source: null,
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
    textAlign: 'center',
    isPlaceholder: false,
    isPreview: false,
    className: null,
};

const QuoteSplit = ({
    background,
    quote,
    source,
    author,
    grid,
    textAlign,
    isPlaceholder,
    isPreview,
    className,
}) => {
    const { width, height } = useScreenSize();

    const items = isPlaceholder
        ? [
            <div className={classNames([styles.splitPlaceholder, styles.placeholderContainer])}>
                <Placeholders.Text className={styles.placeholder} />
            </div>,
            <div className={styles.splitPlaceholder}>
                <Placeholders.Subtitle className={styles.line} />
            </div>,
            <div className={styles.splitPlaceholder}>
                <Placeholders.Subtitle className={styles.line} />
            </div>,
          ]
        : [
            <div
                className={classNames([
                      styles.figure,
                      {
                          [styles.centered]: grid !== null,
                      },
                  ])}
              >
                <blockquote className={styles.blockquote}>
                    <Text {...quote} className={styles.quote} />
                </blockquote>
            </div>,
            <div
                className={classNames([
                      styles.figure,
                      {
                          [styles.centered]: grid !== null,
                      },
                  ])}
              >
                {author ? (
                    <figcaption className={styles.caption}>
                        {author ? (
                            <>
                                <span>&mdash;</span>
                                <Text {...author} className={styles.author} />
                            </>
                          ) : null}
                    </figcaption>
                  ) : null}
            </div>,
            <div
                className={classNames([
                      styles.figure,
                      {
                          [styles.centered]: grid !== null,
                      },
                  ])}
              >
                {source ? (
                    <figcaption className={styles.caption}>
                        {source ? (
                            <cite>
                                <Text {...source} className={styles.source} />
                            </cite>
                          ) : null}
                    </figcaption>
                  ) : null}
            </div>,
          ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles.isGrid]: true,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
                    <Grid {...grid} items={items} className={styles.grid} />
                </Frame>
            </Background>
        </div>
    );
};

QuoteSplit.propTypes = propTypes;
QuoteSplit.defaultProps = defaultProps;

export default QuoteSplit;
