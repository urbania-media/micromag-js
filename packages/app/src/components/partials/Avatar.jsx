import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/avatar.module.scss';

const propTypes = {
    letter: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    small: PropTypes.bool,
    square: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    letter: null,
    color: null,
    image: null,
    small: false,
    square: false,
    className: null,
};

const Avatar = ({ letter, color, image, square, small, className }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.small]: small,
                    [styles.square]: square,
                    [className]: className !== null,
                },
            ])}
            style={{
                backgroundColor: color,
                ...(image ? { backgroundImage: `url(${image})` } : null),
            }}
        >
            {!image ? letter : null}
        </div>
    );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
