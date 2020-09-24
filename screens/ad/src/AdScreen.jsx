/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import Stack from '@micromag/element-stack';
import Image from '@micromag/element-image';
import Link from '@micromag/element-link';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    link: null,
    box: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({
    image: imageProps,
    link: linkProps,
    box,
    background,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const size = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    const { url, target = '_blank', rel = 'noopener noreferer' } = linkProps || {};
    const { image: { url: imageUrl = null } = {} } = imageProps || {};

    const imageElement =
        imageUrl || isEditor ? (
            <Image
                className={styles.content}
                emptyClassName={styles.empty}
                caption={{ body: 'Ad' }}
                {...imageProps}
            />
        ) : null;

    const inner =
        isEditor && !imageUrl ? (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.schemaTitle} />
            </Empty>
        ) : (
            imageElement
        );

    const content =
        url !== null && isView ? (
            <Link url={url} target={target} rel={rel}>
                {inner}
            </Link>
        ) : (
            inner
        );

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
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
            <Stack {...box} isSmall={isSimple}>
                {isPlaceholder ? <Placeholders.AdImage className={styles.placeholder} /> : content}
            </Stack>
        </Screen>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
