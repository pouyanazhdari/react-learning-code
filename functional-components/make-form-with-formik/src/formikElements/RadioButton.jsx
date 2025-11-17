import React, { Fragment } from "react";
import { ErrorMessage, Field } from "formik";
import CustomizeError from "../CustomizeError";

const RadioButton = ({
  label,
  name,
  options = [],
  component = CustomizeError,
  ...rest
}) => {
  return (
    <div className="field radio-group">
      {label && <span className="label-text">{label}</span>}

      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((opt) => (
            <label key={opt.id} className="radio-item" htmlFor={`radio-${opt.id}`}>
              <input
                type="radio"
                id={`radio-${opt.id}`}
                {...field}
                value={opt.id}
                checked={field.value == opt.id}
              />
              <span className="radio-label">{opt.value}</span>
            </label>
          ));
        }}
      </Field>

      <ErrorMessage name={name} component={component} />
    </div>
  );
};

export default RadioButton;
