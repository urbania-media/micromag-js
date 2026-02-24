import PropTypes from 'prop-types';
import React from 'react';

import { convertStyleToString } from '../../utils';

const propTypes = {
    selector: PropTypes.string,
    linkSelector: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

const LinkStyle = ({ selector = null, linkSelector = 'a', style = null }) =>
    style !== null ? (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{
                __html: `${[selector, linkSelector].filter((it) => it !== null).join(' ')}{${convertStyleToString(
                    style,
                )}}`,
            }}
        />
    ) : null;

LinkStyle.propTypes = propTypes;

export default LinkStyle;
