import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const routes = PropTypes.shape({
    home: PropTypes.string.isRequired,

    login: PropTypes.string.isRequired,
    logout: PropTypes.string.isRequired,
    register: PropTypes.string.isRequired,
});
