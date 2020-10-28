import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const filtersValue = PropTypes.shape({
    search: PropTypes.string,
});

export const filters = PropTypes.shape({
    types: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    users: PropTypes.arrayOf(PropTypes.string),
    usage: PropTypes.arrayOf(PropTypes.oneOf(['used', 'unused'])),
});
