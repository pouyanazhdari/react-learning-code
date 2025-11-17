import React from 'react';
import { ErrorMessage, FastField } from "formik";

const TextArea = ({ label, name, placeholder, rows = 4, component, ...rest }) => {
    return (
        <label className="field">
            {label && <span className="label-text">{label}</span>}
            <FastField
                as="textarea"
                name={name}
                placeholder={placeholder}
                rows={rows}
                className="textarea-field"
                {...rest}
            />
            <ErrorMessage name={name} component={component} />
        </label>
    );
};

export default TextArea;
