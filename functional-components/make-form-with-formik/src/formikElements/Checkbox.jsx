import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import CustomizeError from "../CustomizeError";

const Checkbox = ({
  label,
  name,
  options = [],
  component = CustomizeError,
  ...rest
}) => {
  return (
    <label className="field">
      {/* عنوان فیلد */}
      <span className="label-text">{label}</span>

      {/* فیلد فرمیک */}
      <Field name={name} {...rest}>
        {({ field, form }) => {
          /**
           * نکته بسیار مهم:
           * به دلیل اینکه مقدار skils ممکن است از localStorage مقدار غیر آرایه دریافت کند،
           * باید قبل از هرگونه عملیات، مطمئن شویم که آرایه است.
           * در غیر این صورت، خطا می‌گیریم (undefined.includes → error)
           */
          const values = Array.isArray(field.value) ? field.value : [];

          return options.map((opt) => {
            // آیا این گزینه تیک خورده است؟
            const checked = values.includes(opt.id);

            return (
              <Fragment key={opt.id}>
                {/* چک‌باکس */}
                <input
                  type="checkbox"
                  id={`checkbox-${opt.id}`}
                  checked={checked}
                  onChange={() => {
                    if (checked) {
                      /**
                       * اگر قبلاً انتخاب شده بود → باید حذف شود
                       * یعنی مقدار id را از آرایه خارج می‌کنیم
                       */
                      form.setFieldValue(
                        name,
                        values.filter((v) => v !== opt.id)
                      );
                    } else {
                      /**
                       * اگر انتخاب نشده بود → باید اضافه شود
                       * یعنی مقدار id را به آرایه اضافه می‌کنیم
                       */
                      form.setFieldValue(name, [...values, opt.id]);
                    }
                  }}
                />

                {/* متن گزینه */}
                <label htmlFor={`checkbox-${opt.id}`}>{opt.value}</label>
              </Fragment>
            );
          });
        }}
      </Field>

      {/* پیام خطا */}
      <ErrorMessage name={name} component={component} />
    </label>
  );
};

export default Checkbox;
