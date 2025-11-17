import React from "react";
import { ErrorMessage, Field } from "formik";
import CustomizeError from "../CustomizeError";

const SelectBox = ({
  label,
  name,
  options = [],
  placeholder,
  component = CustomizeError,
  ...rest
}) => {
  return (
    <label className="field" htmlFor={`select-${name}`}>
      {label && <span className="label-text">{label}</span>}

      <Field
        as="select"
        name={name}
        id={`select-${name}`}
        className="select-field"
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.value}
          </option>
        ))}
      </Field>

      <ErrorMessage name={name} component={component} />
    </label>
  );
};

export default SelectBox;
