import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const routes = PropTypes.shape({
    home: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
    'screen.field': PropTypes.string.isRequired,
    'screen.field.form': PropTypes.string.isRequired,
});
