import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    name: PropTypes.string,
    time: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    name: '1.0.1',
    time: '24 novembre 2020',
    className: null,
};

const Version = ({ name, time, className }) => {
    return (
        <div
            className={classNames([
                'text-secondary',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <span className="d-block font-weight-light">
                <FormattedMessage defaultMessage="Latest version" description="Label" />
            </span>
            <span className="d-block text">
                {name} - {time}
            </span>
        </div>
    );
};

Version.propTypes = propTypes;
Version.defaultProps = defaultProps;

export default Version;
