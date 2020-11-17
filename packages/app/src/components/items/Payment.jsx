import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    payment: MicromagPropTypes.paymentItem.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const PaymentItem = ({ payment, className }) => {
    const { date = 'Date', amount = 10.0, type = 'refund', link = '/downloads' } = payment || {};

    return (
        <div
            className={classNames([
                'list-group-item',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="d-flex align-items-center justify-content-between">
                <div className="w-50">
                    <strong className="mr-2 text-truncate">{date}</strong>
                    {type === 'refund' ? (
                        <span className="badge badge-warning">
                            <FormattedMessage
                                defaultMessage="Refund"
                                description="Refund type badge"
                            />
                        </span>
                    ) : null}
                </div>
                <div className="d-flex align-items-center">
                    <div>{amount ? `${parseFloat(amount, 10).toFixed(2)} $` : null}</div>
                    <Button className="btn btn-primary ml-4" href={link}>
                        <FontAwesomeIcon icon={faArrowCircleDown} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

PaymentItem.propTypes = propTypes;
PaymentItem.defaultProps = defaultProps;

export default PaymentItem;
