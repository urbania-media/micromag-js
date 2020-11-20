/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import * as AppPropTypes from '../../../lib/PropTypes';
import { useFormValue } from '../../../contexts/FormContext';
import ToggleField from './Toggle';
import TimeField from './Time';
import Label from '../../partials/Label';

import styles from '../../../../styles/panneau/fields/segments.module.scss';

const messages = defineMessages({
    selectShow: {
        id: 'forms.select_show_to_view_segments',
        defaultMessage: 'Select a show to view segments...',
    },
});

const propTypes = {
    value: AppPropTypes.segments,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const SegmentsField = ({ value, onChange, className }) => {
    const formValue = useFormValue();
    const showValue = formValue !== null ? formValue.show || null : null;
    const onSegmentToggleChange = useCallback(
        (segment, newToggleValue) => {
            const newValue = !newToggleValue
                ? (value || []).filter((it) => it.id !== segment.id)
                : [
                      ...(value || []),
                      {
                          id: segment.id,
                      },
                  ];
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    const onSegmentTimeChange = useCallback(
        (segment, newTimeValue) => {
            const newValue = (value || []).map((it) =>
                it.id === segment.id
                    ? {
                          ...it,
                          start_time: newTimeValue,
                      }
                    : it,
            );
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return showValue !== null ? (
        <div
            className={classNames([
                'list-group',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {showValue.segments.map((it) => {
                const segmentValue = (value || []).find((segment) => segment.id === it.id) || null;
                const segmentEnabled = segmentValue !== null;
                return (
                    <div className="list-group-item p-2" key={`segment-${it.id}`}>
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <ToggleField
                                    value={segmentEnabled}
                                    onChange={(newValue) => onSegmentToggleChange(it, newValue)}
                                />
                            </div>
                            <div className="col">
                                <small className={styles.label}>{it.title}</small>
                            </div>
                            <div className="col-auto">
                                <TimeField
                                    value={
                                        segmentValue !== null
                                            ? segmentValue.start_time || null
                                            : null
                                    }
                                    size="sm"
                                    className={styles.timeInput}
                                    disabled={!segmentEnabled}
                                    onChange={(newValue) => onSegmentTimeChange(it, newValue)}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <div className="card bg-light text-muted text-center">
            <div className="card-body">
                <Label>{messages.selectShow}</Label>
            </div>
        </div>
    );
};

SegmentsField.propTypes = propTypes;
SegmentsField.defaultProps = defaultProps;

export default SegmentsField;
