import PropTypes from 'prop-types';

export const routes = PropTypes.shape({
    home: PropTypes.string.isRequired,

    login: PropTypes.string.isRequired,
    logout: PropTypes.string.isRequired,
    register: PropTypes.string.isRequired,
});

export const user = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
});
