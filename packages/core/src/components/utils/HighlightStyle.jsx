import PropTypes from 'prop-types';
import React from 'react';

import { convertStyleToString } from '../../utils';

const propTypes = {
    selector: PropTypes.string,
    highlightSelector: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

const defaultProps = {
    selector: null,
    highlightSelector: 'mark',
    style: null,
};

const HighlightStyle = ({ selector, highlightSelector, style }) =>
    style !== null ? (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{
                __html: `${[selector, highlightSelector]
                    .filter((it) => it !== null)
                    .join(' ')}{${convertStyleToString(style)}}`,
            }}
        />
    ) : null;

HighlightStyle.propTypes = propTypes;
HighlightStyle.defaultProps = defaultProps;

export default HighlightStyle;
