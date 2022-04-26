import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import styles from './sign-modal.module.scss';
import signsList from './signs';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    backButton: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    background: null,
    backButton: null,
    className: null,
};

const SignModal = ({ width, height, background, backButton, className }) => {
    const items = [
        <Button onClick={backButton} className={styles.backButton}>
            Back to the signs
        </Button>,
        // <Container
        //     className={classNames([
        //         styles.modalContainer,
        //         {
        //             [className]: className !== null,
        //         },
        //     ])}
        // >
        //     <ScreenElement
        //         key="category"
        //         placeholder={<PlaceholderTitle className={styles.categoryPlaceholder} />}
        //         emptyLabel={
        //             <FormattedMessage
        //                 defaultMessage="Category"
        //                 description="Category placeholder"
        //             />
        //         }
        //         emptyClassName={styles.emptyText}
        //         // isEmpty={!hasCategory}
        //     >
        //         {/* {hasCategory ? ( */}
        //         <Heading
        //             className={classNames([
        //                 styles.category,
        //                 {
        //                     [className]: className !== null,
        //                     // [styles.noBottomBorder]: onlyCategory,
        //                 },
        //             ])}
        //             // {...category}
        //         />
        //         {/* ) : null} */}

        //         <h1>TEST</h1>
        //     </ScreenElement>
        // </Container>,
        <div className={styles.modalContainer}>
            <h1>TEST</h1>
        </div>,
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                // background={background || { color: '#f40' }}
                width={width}
                height={height}
                // playing={backgroundPlaying}
                // shouldLoad={backgroundShouldLoad}
            />
            <Container width={width} height={height}>
                <Layout
                    width={width}
                    height={height}
                    className={styles.layout}
                    verticalAlign="middle"
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

SignModal.propTypes = propTypes;
SignModal.defaultProps = defaultProps;

export default React.memo(SignModal);
