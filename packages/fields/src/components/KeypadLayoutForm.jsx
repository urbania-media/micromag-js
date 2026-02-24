/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import Keypad from '@micromag/element-keypad';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/keypad-layout-form.module.css';

function getPreviewItemsByColumns(columns) {
    switch (columns) {
        case 1:
            return [1, 2];
        case 2:
            return [1, 2, 3];
        case 3:
            return [1, 2, 3, 4];
        case 4:
            return [1, 2, 3, 4, 5, 6, 7];
        default:
            return [1, 2, 3];
    }
}

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const KeypadLayoutForm = ({ value = null, onChange = null, closeForm = null, ...props }) => {
    const intl = useIntl();
    const { columnAlign = null, columns = null, spacing = null } = value || {};
    const finalSpacingPreview = Math.max(0, Math.min(4, spacing));
    const previewItems = getPreviewItemsByColumns(columns);

    function getAlignIntlLabel(columnAlignValue) {
        switch (columnAlignValue) {
            case 'left':
                return intl.formatMessage({
                    defaultMessage: 'left aligned',
                    description: 'Alignment label',
                });
            case 'middle':
                return intl.formatMessage({
                    defaultMessage: 'middle aligned',
                    description: 'Alignment label',
                });
            case 'right':
                return intl.formatMessage({
                    defaultMessage: 'right aligned',
                    description: 'Alignment label',
                });
            default:
                return '';
        }
    }

    const label = (
        <div className={styles.previewLabel}>
            {columns}{' '}
            {intl.formatMessage({
                defaultMessage: 'columns',
                description: 'Alignment label',
            })}{' '}
            , {getAlignIntlLabel(columnAlign)}, {spacing}px
        </div>
    );

    const previewElement =
        value !== null ? (
            <div>
                <Keypad
                    className={classNames([
                        styles.previewKeypad,
                        {
                            [styles.oneColumn]: columns === 1,
                        },
                    ])}
                    align={columnAlign}
                    columns={columns}
                    spacing={finalSpacingPreview}
                    items={previewItems.map((n) => (
                        <div key={n} className={styles.previewKey}>
                            <div className={styles.previewButton} />
                        </div>
                    ))}
                />
            </div>
        ) : null;

    return (
        <FieldWithForm
            isForm
            value={value}
            isHorizontal={false}
            label={label}
            onChange={onChange}
            thumbnail={previewElement}
            {...props}
        />
    );
};

KeypadLayoutForm.propTypes = propTypes;
// KeypadLayoutForm.withForm = true;

export default KeypadLayoutForm;
