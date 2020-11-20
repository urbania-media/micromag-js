/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

// import * as AppPropTypes from '../../../lib/PropTypes';
import ItemField from './Item';
import { useFormValue } from '../../../contexts/FormContext';

const propTypes = {
    requestQuery: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    requestQuery: null,
};

const EditionItemField = ({ requestQuery, ...props }) => {
    const formValue = useFormValue();
    const editionId =
        formValue !== null && (formValue.edition || null) !== null
            ? formValue.edition.id || null
            : null;
    const query = useMemo(
        () => ({
            ...requestQuery,
            edition_id: editionId,
        }),
        [editionId, requestQuery],
    );
    return <ItemField {...props} requestQuery={query} />;
};

EditionItemField.propTypes = propTypes;
EditionItemField.defaultProps = defaultProps;

export default EditionItemField;
