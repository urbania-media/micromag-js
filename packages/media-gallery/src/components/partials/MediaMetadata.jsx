/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Fields } from '@micromag/fields';
import DropdownButton from '../buttons/DropdownButton';

import styles from '../../styles/partials/media-metadata.module.scss';

const propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    fields: [
        {
            component: 'fields',
            label: 'Étiquettes',
            withBorders: false,
            isSection: true,
            fields: [
                {
                    component: 'tokens',
                    name: 'tags',
                },
            ],
        },
        {
            component: 'fields',
            label: 'Rensignements généraux',
            withBorders: true,
            isSection: true,
            fields: [
                {
                    component: 'static-field',
                    label: 'Ajouté par',
                    name: 'user',
                    isHorizontal: true,
                },
                {
                    component: 'static-field',
                    label: "Date de l'ajout",
                    name: 'date',
                    isHorizontal: true,
                },
                {
                    component: 'static-field',
                    label: 'Utilisé',
                    name: 'usage',
                    isHorizontal: true,
                },
            ],
        },
        {
            component: 'fields',
            label: 'Détails techniques',
            withBorders: true,
            isSection: true,
            fields: [
                {
                    component: 'static-field',
                    label: 'Format',
                    name: 'format',
                    isHorizontal: true,
                },
                {
                    component: 'static-field',
                    label: 'Durée',
                    name: 'length',
                    isHorizontal: true,
                },
                {
                    component: 'static-field',
                    label: 'Dimensions',
                    name: 'dimensions',
                    isHorizontal: true,
                },
                {
                    component: 'static-field',
                    label: 'Poids',
                    name: 'size',
                    isHorizontal: true,
                },
            ],
        },
    ],
    value: null,
    onChange: null,
    className: null,
};

const MediaMetadata = ({ fields, value, onChange, className }) => {
    const onMetadataChange = useCallback(newFieldValue =>
        onChange !== null ? onChange(newFieldValue) : null,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.preview}>
                <div className={styles.settings}>
                    <DropdownButton />
                </div>
                <div className={styles.play}>
                    <FontAwesomeIcon icon={faPlayCircle} />
                </div>
            </div>
            <div className={styles.fields}>
                <Fields fields={fields} value={value} onChange={onMetadataChange} />
            </div>
        </div>
    );
};

MediaMetadata.propTypes = propTypes;
MediaMetadata.defaultProps = defaultProps;

export default MediaMetadata;
