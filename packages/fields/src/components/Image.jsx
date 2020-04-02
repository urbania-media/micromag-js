import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';
import { getFileName } from '@micromag/core/utils';


import styles from '../styles/image.module.scss';

const propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
        credits: PropTypes.string,
    }),
    className: PropTypes.string,
    form: PropTypes.oneOf(['image', 'image-component']),
    withBorders: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    gotoForm: PropTypes.func.isRequired,
};

const defaultProps = {
    value: null,
    form: 'image',
    withBorders: false,
    isHorizontal: false,
    className: null,
};

const Image = ({ value, className, withBorders, isHorizontal, form, gotoForm }) => {
    const { image = null, url = null, caption = null } = value || {};
    const finalUrl = image !== null ? image.url || null : url;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorders]: withBorders,
                    [styles.isHorizontal]: isHorizontal,
                    [className]: className !== null,
                },
            ])}
        >
            <Button withoutStyle className={styles.button} onClick={() => gotoForm(form)}>
                {finalUrl !== null ? (
                    <>
                        <span className={styles.name}>{getFileName(finalUrl)}</span>
                        <img src={finalUrl} className={styles.thumbnail} alt={caption} />
                    </>
                ) : (
                    <span className={styles.noValue}>Sélectionnez une image</span>
                )}
                <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
            </Button>
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
