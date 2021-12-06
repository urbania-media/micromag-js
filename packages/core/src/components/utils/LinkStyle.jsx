import PropTypes from 'prop-types';
import React from 'react';
import { convertStyleToString } from '../../utils';

const propTypes = {
    selector: PropTypes.string,
    linkSelector: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

const defaultProps = {
    selector: null,
    linkSelector: 'a',
    style: null,
};

const LinkStyle = ({ selector, linkSelector, style }) =>
    style !== null ? (
        <style type="text/css">{`${[selector, linkSelector].filter(it => it !== null).join(' ')}{${convertStyleToString(
            style,
        )}}`}</style>
    ) : null;

LinkStyle.propTypes = propTypes;
LinkStyle.defaultProps = defaultProps;

export default LinkStyle;
