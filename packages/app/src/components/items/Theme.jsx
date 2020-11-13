/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import ScreensCount from '../partials/ScreensCount';

import styles from '../../styles/items/story-card.module.scss';

const propTypes = {
    item: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ThemeItem = ({ item, className }) => {
    const url = useUrlGenerator();
    const { id: theme = 0, title = 'Theme', components = [] } = item || {};
    const screensCount = components.length;
    return (
        <Card
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            theme="dark"
            footer={
                <>
                    <Link
                        href={url('themes.editor', {
                            theme,
                        })}
                        className="card-link text-white"
                    >
                        <FormattedMessage defaultMessage="Edit" description="Button label" />
                    </Link>
                </>
            }
        >
            <h4
                className={classNames([
                    'card-title',
                    {
                        'mb-0': screensCount === 0,
                    },
                ])}
            >
                <Link
                    to={url('themes.show', {
                        theme,
                    })}
                    className="text-white"
                >
                    {title}
                </Link>
            </h4>
            {screensCount > 0 ? (
                <p className="text-muted mb-0">
                    <ScreensCount count={screensCount} />
                </p>
            ) : null}
        </Card>
    );
};

ThemeItem.propTypes = propTypes;
ThemeItem.defaultProps = defaultProps;

export default ThemeItem;
