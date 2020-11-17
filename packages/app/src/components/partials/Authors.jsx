import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from './Avatar';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/authors.module.scss';

const propTypes = {
    authors: AppPropTypes.authors,
    maxItems: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    authors: [
        { id: 1, name: 'paul', color: '#ccc' },
        { id: 2, name: 'john', color: '#fff' },
        { id: 3, name: 'george', color: '#444' },
        { id: 4, name: 'george', color: '#444' },
    ],
    maxItems: 2,
    className: null,
};

const Authors = ({ authors, maxItems, className }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                {authors !== null
                    ? authors.map((a, i) =>
                          i >= maxItems - 1 ? (
                              <Avatar
                                  className={styles.item}
                                  key={`author-${a.id}-${a.name}`}
                                  color={a.color}
                                  small
                              />
                          ) : null,
                      )
                    : null}
                {authors.length > maxItems ? (
                    <Avatar
                        className={styles.item}
                        key="author-more"
                        color="#000"
                        letter="..."
                        small
                    />
                ) : null}
            </div>
        </div>
    );
};

Authors.propTypes = propTypes;
Authors.defaultProps = defaultProps;

export default Authors;
