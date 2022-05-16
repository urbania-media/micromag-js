/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from '../styles/thumbnail-file.module.scss';
import Radios from './Radios';

const propTypes = {
    value: PropTypes.shape({
        thumbnail: PropTypes.number,
    }),
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    fieldName: 'thumbnail_file',
    onChange: null,
    className: null,
};

function ThumbnailFile({ value, fieldName, onChange, className, ...props }) {
    const { media = null } = value || {};
    const thumbnailValue = value !== null ? value[fieldName] || null : null;
    const onThumbnailChange = useCallback(
        (newThumbnailValue) => {
            const newValue = {
                ...value,
                [fieldName]: newThumbnailValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, fieldName, onChange],
    );
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
    return options === null ? (
        <div className="card card-body">
            <FormattedMessage defaultMessage="No thumbnail" description="Field no value label" />
        </div>
    ) : (
        <Radios
            value={thumbnailValue}
            options={options || []}
            onChange={onThumbnailChange}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            buttonClassName={styles.button}
            {...props}
        />
    );
}

ThumbnailFile.propTypes = propTypes;
ThumbnailFile.defaultProps = defaultProps;

export default ThumbnailFile;
