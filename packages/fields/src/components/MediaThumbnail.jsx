/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useFieldsValue } from '@micromag/core/contexts';

import FieldRow from './FieldRow';
import Image from './Image';
import Radios from './Radios';

import styles from '../styles/media-thumbnail.module.scss';

const propTypes = {
    value: PropTypes.oneOf([PropTypes.string, MicromagPropTypes.imageMedia]),
    isForm: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isForm: false,
    onChange: null,
    className: null,
};

function MediaThumbnail({ value, onChange, className, isForm, ...props }) {
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
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Image {...props} isForm value={isObject(value) ? value : null} onChange={onChange} />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
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
            <FieldRow {...props} withForm>
                <Image value={isObject(value) ? value : null} onChange={onChange} {...props} />
            </FieldRow>
        </div>
    );
}

MediaThumbnail.propTypes = propTypes;
MediaThumbnail.defaultProps = defaultProps;

export default MediaThumbnail;
