/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Text from '@micromag/element-text';
import Grid from '@micromag/element-grid';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';
import blockStyles from './styles-block.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundElement,
    quote: MicromagPropTypes.textElement,
    source: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    grid: MicromagPropTypes.gridElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    visible: true,
    renderFormat: 'view',
    className: null,
};

const QuoteSplitScreen = ({
    background,
    quote,
    source,
    author,
    grid,
    textAlign,
    visible,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);

    const items = isPlaceholder
        ? [
            <div
                className={classNames([
                      blockStyles.splitPlaceholder,
                      blockStyles.placeholderContainer,
                  ])}
              >
                <Placeholders.Text className={blockStyles.placeholder} />
            </div>,
            <div className={blockStyles.splitPlaceholder}>
                <Placeholders.Line className={blockStyles.line} />
            </div>,
            <div className={blockStyles.splitPlaceholder}>
                <Placeholders.Line className={blockStyles.line} />
            </div>,
          ]
        : [
            <div
                className={classNames([
                      blockStyles.figure,
                      {
                          [blockStyles.centered]: grid !== null,
                      },
                  ])}
              >
                <blockquote className={blockStyles.blockquote}>
                    <Text
                        {...quote}
                        className={blockStyles.quote}
                        emptyClassName={blockStyles.empty}
                        showEmpty={isEditor && quote === null}
                      />
                </blockquote>
            </div>,
            <div
                className={classNames([
                      blockStyles.figure,
                      {
                          [blockStyles.centered]: grid !== null,
                      },
                  ])}
              >
                {author ? (
                    <figcaption className={blockStyles.caption}>
                        {author ? (
                            <>
                                <span>&mdash;</span>
                                <Text {...author} className={blockStyles.author} />
                            </>
                          ) : null}
                    </figcaption>
                  ) : null}
            </div>,
            <div
                className={classNames([
                      blockStyles.figure,
                      {
                          [blockStyles.centered]: grid !== null,
                      },
                  ])}
              >
                {source ? (
                    <figcaption className={blockStyles.caption}>
                        {source ? (
                            <cite>
                                <Text {...source} className={blockStyles.source} />
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
                    [styles.disabled]: isSimple,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height} visible={visible}>
                    <Grid {...grid} items={items} className={styles.grid} />
                </Frame>
            </Background>
        </div>
    );
};

QuoteSplitScreen.propTypes = propTypes;
QuoteSplitScreen.defaultProps = defaultProps;

export default QuoteSplitScreen;
