import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/avatar.module.scss';

const propTypes = {
    short_name: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    small: PropTypes.bool,
    square: PropTypes.bool,
    inverted: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    short_name: null,
    color: null,
    image: null,
    small: false,
    square: false,
    inverted: false,
    className: null,
};

const Avatar = ({ short_name: shortName, color, image, square, small, inverted, className }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.small]: small,
                    [styles.square]: square,
                    [styles.inverted]: inverted,
                    [className]: className !== null,
                },
            ])}
            style={{
                backgroundColor: color,
                ...(image ? { backgroundImage: `url(${image})` } : null),
            }}
        >
            {!image ? <span className={styles.letter}>{shortName}</span> : null}
        </div>
    );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
