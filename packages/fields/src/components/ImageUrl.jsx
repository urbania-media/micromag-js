import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@micromag/core/components';

import UrlField from './Url';

import styles from '../styles/image-url.module.scss';

const propTypes = {
    value: PropTypes.string,
    recents: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    recents: [
        'https://dl.dropboxusercontent.com/s/ktsanwvx0wpzonr/desert.png',
        'https://dl.dropboxusercontent.com/s/8ac3tb7f906gesb/et.png',
        'https://dl.dropboxusercontent.com/s/znt36b0y7446ksw/et1.png',
        'https://dl.dropboxusercontent.com/s/cqyimaoy8cay1px/et2.png',
        'https://dl.dropboxusercontent.com/s/mx5okt0hnu4rfw0/et3.png',
        'https://dl.dropboxusercontent.com/s/c5zvc7b6d8092x1/et4.png',
        'https://dl.dropboxusercontent.com/s/hwo04lrf4nom7bl/intro.png',
    ],
    className: null,
    onChange: null,
};

const ImageUrl = ({ value, recents, className, onChange }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className={styles.field}>
            <UrlField value={value} onChange={onChange} />
        </div>
        <div className={styles.recent}>
            <h4>Images récentes</h4>
            <ul className={styles.items}>
                {recents.map(url => (
                    <li key={`recent-${url}`} className={styles.item}>
                        <Button
                            className={styles.button}
                            withoutStyle
                            onClick={() => onChange(url)}
                        >
                            <img src={url} className={styles.image} alt="recent" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
        {value !== null ? (
            <div className={styles.preview}>
                <img src={value} alt="preview" />
            </div>
        ) : null}
    </div>
);

ImageUrl.propTypes = propTypes;
ImageUrl.defaultProps = defaultProps;

export default ImageUrl;
