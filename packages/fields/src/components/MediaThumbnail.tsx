/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isObject from 'lodash-es/isObject';
import React, { useMemo } from 'react';

import type { ImageMedia } from '@micromag/core';
import { useFieldsValue } from '@micromag/core/contexts';

import FieldRow from './FieldRow';
import Image from './Image';
import Radios from './Radios';

import styles from '../styles/media-thumbnail.module.css';

interface MediaThumbnailProps {
    value?: unknown | null;
    isForm?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function MediaThumbnail({
    value = null,
    onChange = null,
    className = null,
    isForm = false,
    ...props
}: MediaThumbnailProps) {
    const { media = null } = useFieldsValue() || {};
    const options = useMemo(() => {
        if (media === null) {
            return null;
        }
        const { files = null } = media;
        return files !== null
            ? Object.keys(files)
                  .filter((key) => {
                      const { handle = null } = files[key];
                      return handle !== null && handle.match(/^thumbnail/) !== null;
                  })
                  .map((key) => {
                      const { handle, url } = files[key];
                      return {
                          value: handle,
                          label: <img src={url} alt={handle} className={styles.thumbnail} />,
                      };
                  })
            : null;
    }, [media]);

    return isForm ? (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            <Image {...props} isForm value={isObject(value) ? value : null} onChange={onChange} closeForm={null} />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            {options !== null ? (
                <div className="mb-4">
                    <Radios
                        value={!isObject(value) ? value : null}
                        options={options || []}
                        onChange={onChange}
                        className={styles.radios}
                        buttonClassName={styles.button}
                        {...props}
                    />
                </div>
            ) : null}
            <FieldRow {...props}>
                <Image {...props} value={isObject(value) ? value : null} onChange={onChange} closeForm={null} />
            </FieldRow>
        </div>
    );
}

export default MediaThumbnail;
