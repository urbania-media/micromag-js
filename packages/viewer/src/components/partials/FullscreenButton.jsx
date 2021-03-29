import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '@micromag/core/components';
import { toggleFullscreen } from '@micromag/core/utils';

import styles from '../../styles/partials/share-button.module.scss';

const propTypes = {
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    buttonClassName: null,
    children: null,
};

const FullscreenButton = ({ className, buttonClassName, children }) => {
    const onClick = useCallback(() => {
        toggleFullscreen();
    }, []);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button
                className={classNames([{ [buttonClassName]: buttonClassName !== null }])}
                onClick={onClick}
            >
                {children}
            </Button>
        </div>
    );
};

FullscreenButton.propTypes = propTypes;
FullscreenButton.defaultProps = defaultProps;

export default FullscreenButton;
