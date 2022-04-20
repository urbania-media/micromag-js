import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: '#222',
    className: null,
};

const WatchIcon = ({ color, className }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0px"
        width="17.76px"
        height="17.76px"
        viewBox="0 0 17.76 17.76"
        className={className}
        xmlSpace="preserve"
    >
        <g transform="translate(0 0)">
            <path
                fill={color}
                d="M8.34,0h1.08s.06,.02,.1,.02c.89,.07,1.77,.26,2.6,.59,1.9,.74,3.48,2.11,4.48,3.88,.5,.88,.85,1.84,1.02,2.84,.06,.34,.1,.69,.14,1.04v1.05s-.02,.1-.03,.15c-.2,2.62-1.55,5.01-3.69,6.53-1.17,.85-2.54,1.39-3.98,1.57l-.64,.09h-1.08s-.1-.02-.15-.03c-.94-.07-1.87-.3-2.74-.66C2.55,15.85,.51,13.18,.08,10.06c-.03-.21-.06-.43-.08-.64v-1.08c0-.06,.02-.11,.03-.17C.21,5.84,1.32,3.67,3.1,2.15,4.4,1.02,6,.3,7.71,.08l.63-.08Zm7.94,8.71c-.09-4.09-3.48-7.32-7.57-7.23-4.09,.09-7.32,3.48-7.23,7.57,.09,4.09,3.48,7.32,7.57,7.23,.04,0,.07,0,.11,0,4.04-.16,7.2-3.53,7.12-7.56h0Z"
            />
            <path
                fill={color}
                d="M7.42,8.89v-2.61c-.02-.2,.09-.4,.28-.48,.15-.06,.32-.04,.44,.06,.39,.28,.78,.56,1.17,.85,.82,.59,1.63,1.19,2.45,1.78,.22,.11,.3,.38,.19,.59-.04,.08-.11,.15-.19,.19-.6,.45-1.21,.89-1.82,1.33-.59,.43-1.18,.86-1.78,1.29-.16,.17-.43,.17-.6,0-.02-.02-.03-.03-.04-.05-.07-.11-.1-.24-.1-.37,0-.86,0-1.72,0-2.58h0Z"
            />
        </g>
    </svg>
);

WatchIcon.propTypes = propTypes;
WatchIcon.defaultProps = defaultProps;

export default WatchIcon;
