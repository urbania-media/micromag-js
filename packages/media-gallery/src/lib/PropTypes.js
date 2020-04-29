import PropTypes from 'prop-types';

export const filtersValue = PropTypes.shape({
    search: PropTypes.string,
});

export const media = PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    thumbnail_url: PropTypes.string,
    name: PropTypes.string,
    filename: PropTypes.string,
    size: PropTypes.number,
    metadata: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        duration: PropTypes.number,
    }),
});
export const medias = PropTypes.arrayOf(media);
