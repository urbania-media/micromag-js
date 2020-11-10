import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import PaymentItem from '../items/Payment';

const propTypes = {
    items: MicromagPropTypes.paymentItems,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    className: null,
};

const PaymentsList = ({ items, className }) => {
    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {items.map((payment) => (
                <PaymentItem key={`payment-${payment.id}`} payment={payment} />
            ))}
        </div>
    );
};

PaymentsList.propTypes = propTypes;
PaymentsList.defaultProps = defaultProps;

export default PaymentsList;
