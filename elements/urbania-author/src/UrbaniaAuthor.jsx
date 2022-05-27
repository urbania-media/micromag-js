/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isTextFilled } from '@micromag/core/utils';
import Link from '@micromag/element-link';
import Text from '@micromag/element-text';
import Avatar from './Avatar';
import styles from './styles.module.scss';

const propTypes = {
    author: PropTypes.shape({
        slug: PropTypes.string,
        name: MicromagPropTypes.textElement,
        image: MicromagPropTypes.imageElement,
        url: PropTypes.string,
        collaborator: MicromagPropTypes.textElement,
    }),
    withImage: PropTypes.bool,
    withoutLink: PropTypes.bool,
    withoutPrefix: PropTypes.bool,
    isSmall: PropTypes.bool,
    linkUnderlineColor: PropTypes.string,
    className: PropTypes.string,
    shouldLoad: PropTypes.bool,
};

const defaultProps = {
    author: null,
    withImage: true,
    withoutLink: false,
    withoutPrefix: false,
    isSmall: false,
    linkUnderlineColor: null,
    className: null,
    shouldLoad: true,
};

const UrbaniaAuthor = ({
    author,
    withImage,
    withoutLink,
    withoutPrefix,
    isSmall,
    linkUnderlineColor,
    className,
    shouldLoad,
}) => {
    const intl = useIntl();
    const { name = null, image = null, url = null, collaborator = null } = author || {};

    const prefix = intl.formatMessage({
        defaultMessage: 'By',
        description: 'Author label',
    });

    const and = intl.formatMessage({
        defaultMessage: 'Et',
        description: 'Author label',
    });

    const authorText = isTextFilled(name) ? <Text className={styles.name} {...name} /> : null;
    const collaboratorText = isTextFilled(collaborator) ? (
        <Text className={styles.collaboratorText} {...collaborator} inline />
    ) : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSmall]: isSmall,
                    [styles.withoutImage]: !withImage || image === null,
                    [className]: className !== null,
                },
            ])}
        >
            {!withoutPrefix ? (
                <Text {...name} className={styles.prefix} body={`<span>${prefix}<span>`} />
            ) : null}
            {withImage && image !== null ? (
                <Avatar className={styles.image} image={image} shouldLoad={shouldLoad} />
            ) : null}
            <div className={styles.right}>
                {url !== null && !withoutLink ? (
                    <Link
                        className={styles.link}
                        url={url}
                        external
                        style={{
                            backgroundImage:
                                linkUnderlineColor !== null
                                    ? `linear-gradient(0deg, ${linkUnderlineColor} 0, ${linkUnderlineColor})`
                                    : null,
                        }}
                    >
                        {authorText}
                    </Link>
                ) : (
                    <div>{authorText}</div>
                )}
                {collaboratorText !== null ? (
                    <div className={styles.collaborator}>
                        <span className={styles.collaboratorPrefix}>{and}</span>
                        {collaboratorText !== null ? collaboratorText : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

UrbaniaAuthor.propTypes = propTypes;
UrbaniaAuthor.defaultProps = defaultProps;

export default UrbaniaAuthor;
