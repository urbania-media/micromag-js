/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { Fields } from '@micromag/fields';
import { useFieldSchemaFields } from '@micromag/schemas';
import { Button } from '@micromag/core/components';

import createNullableOnChange from '../../utils/createNullableOnChange';

import styles from '../../styles/forms/image.module.scss';

const propTypes = {
    value: PropTypes.shape({}),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    onChange: null,
    className: null,
};

const ImageForm = ({ value, className, onChange }) => {
    const history = useHistory();
    const fields = useFieldSchemaFields('image');
    const nullableOnChange = useCallback(createNullableOnChange(onChange), [onChange]);
    const onClick = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
        history.goBack();
    }, [history, onChange]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <Fields fields={fields} value={value} onChange={nullableOnChange} />
            <Button onClick={onClick} className={styles.button} disabled={value === null}>
                Effacer l’image
            </Button>
        </div>
    );
};

ImageForm.propTypes = propTypes;
ImageForm.defaultProps = defaultProps;

export default ImageForm;
