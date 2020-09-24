/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from '@micromag/element-screen';
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
    active: PropTypes.bool,
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
    active: false,
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
    active,
    renderFormat,
    className,
}) => {
    const size = useScreenSize();
    const { isPlaceholder, isEditor } = getRenderFormat(renderFormat);

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

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className,
        },
    ]);

    return (
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            <Grid {...grid} items={items} className={styles.grid} />
        </Screen>
    );
};

QuoteSplitScreen.propTypes = propTypes;
QuoteSplitScreen.defaultProps = defaultProps;

export default QuoteSplitScreen;
