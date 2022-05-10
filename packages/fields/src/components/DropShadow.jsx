/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { getStyleFromBox } from '@micromag/core/utils';
// import styles from '../styles/box-style.module.scss';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    // className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    // className: null,
    onChange: null,
};

const DropShadow = ({ value, onChange }) => {
    console.log('hey'); // eslint-disable-line

    return (
        <FieldWithForm
            isForm
            value={value}
            onChange={onChange}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit style..." description="No value label" />
            }
        />
    );
};

DropShadow.propTypes = propTypes;
DropShadow.defaultProps = defaultProps;
DropShadow.withForm = true;

export default DropShadow;
