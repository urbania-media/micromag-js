import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useRouteBack } from '@micromag/core/contexts';

import { Button } from '@micromag/core/components';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    children: null,
};

const BackLinks = ({ className, children }) => {
    const back = useRouteBack();
    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button asLink onClick={back}>
                <FormattedMessage defaultMessage="Back" description="Back page button" />
            </Button>
            {children}
        </div>
    );
};

BackLinks.propTypes = propTypes;
BackLinks.defaultProps = defaultProps;

export default BackLinks;
