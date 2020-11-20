/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { Screens } from '@micromag/editor';
import { ScreensProvider } from '@micromag/screens';
import { useStory } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ThemesShowPage = ({ location: { pathname }, className }) => {
    const { theme: themeId } = useParams();
    const url = useUrlGenerator();
    const { theme = null } = useStory(themeId);
    const { id = null, title = null, components: screens = null } = theme || {};

    const parent = title !== null ? title : null;
    const parentUrl = id !== null ? url('themes.show', { theme: id }) : null;
    const pageTitle = <FormattedMessage defaultMessage="Theme" descrition="Page title" />;

    return (
        <MainLayout
            nav={[
                { label: parent, url: parentUrl },
                { label: pageTitle, url: pathname },
            ]}
        >
            <Page title={title} sidebar={null} className={className}>
                {screens !== null && screens.length > 0 ? (
                    <ScreensProvider>
                        <Screens
                            items={screens.map((it) => ({
                                screen: it,
                                href: url('themes.editor', {
                                    theme: id,
                                }),
                            }))}
                            withPreview
                        />
                    </ScreensProvider>
                ) : (
                    <div className="jumbotron text-center bg-dark text-light">
                        <h1 className="display-4">
                            <FormattedMessage
                                defaultMessage="No theme screen yet"
                                description="No screen yet status"
                            />
                        </h1>
                        <p className="lead pt-4">
                            {theme !== null ? (
                                <Button
                                    href={url('themes.editor', {
                                        theme: id,
                                    })}
                                    theme="primary"
                                    size="lg"
                                >
                                    <FormattedMessage
                                        defaultMessage="Create your first screen"
                                        description="Create first screen button label"
                                    />
                                </Button>
                            ) : null}
                        </p>
                    </div>
                )}
            </Page>
        </MainLayout>
    );
};

ThemesShowPage.propTypes = propTypes;
ThemesShowPage.defaultProps = defaultProps;

export default ThemesShowPage;
