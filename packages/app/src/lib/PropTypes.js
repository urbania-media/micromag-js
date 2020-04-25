import PropTypes from 'prop-types';

export const routes = PropTypes.shape({
    home: PropTypes.string.isRequired,

    'auth.login': PropTypes.string.isRequired,
    'auth.logout': PropTypes.string.isRequired,
    'auth.forgot_password': PropTypes.string.isRequired,
    'auth.reset_password': PropTypes.string.isRequired,

    register: PropTypes.string.isRequired,
    'register.confirmation': PropTypes.string.isRequired,

    account: PropTypes.string.isRequired,

    organisation: PropTypes.string.isRequired,
    'organisation.switch': PropTypes.string.isRequired,
    'organisation.settings': PropTypes.string.isRequired,
    'organisation.members': PropTypes.string.isRequired,

    stories: PropTypes.string.isRequired,
    'stories.editor': PropTypes.string.isRequired,
});

export const organisation = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
});

export const organisations = PropTypes.arrayOf(organisation);

export const user = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    organisations,
});
