/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Image from '@micromag/element-image';
import Link from '@micromag/element-link';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    text: MicromagPropTypes.text,
    fullScreen: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    onImageLoaded: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    link: null,
    text: null,
    fullScreen: false,
    renderFormat: 'view',
    onImageLoaded: null,
    className: null,
};

const AdImage = ({
    image: imageProps,
    link: linkProps,
    text: textProps,
    fullScreen,
    renderFormat,
    onImageLoaded,
    className
}) => {
    const { isView, isEditor } = getRenderFormat(renderFormat);
    const { url = null, target = '_blank', rel = 'noopener noreferer' } = linkProps || {};
    const { body: caption, style: captionStyle } = textProps || {};
    const hasCaption = isView || isEditor;

    const imageClassNames = classNames([
        styles.image,
        {
            [className]: className !== null,
            [styles.fullscreen]: fullScreen,
        },
    ]);

    const imageElement = imageProps ? (
        <Image
            {...imageProps}
            className={imageClassNames}
            emptyClassName={styles.empty}
            caption={hasCaption ? caption : null}
            captionStyle={hasCaption ? captionStyle : null}
            onLoaded={onImageLoaded}
        />
    ) : null;

    return url !== null && isView ? (
        <Link url={url} target={target} rel={rel} className={imageClassNames}>
            {imageElement}
        </Link>
    ) : (
        imageElement
    );
};

AdImage.propTypes = propTypes;
AdImage.defaultProps = defaultProps;

export default AdImage;
