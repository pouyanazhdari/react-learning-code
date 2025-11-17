// formikElements/Input.jsx
import React from "react";
import { Field, ErrorMessage } from "formik";
import CustomizeError from "../CustomizeError";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  component = CustomizeError,

  // تنظیمات رفتاری عمومی
  onlyNumbers = false,
  onlyLetters = false,
  maxLength,
  minLength,
  inputMode,
  toUpperCase = false,
  toLowerCase = false,

  // برای موارد خاص: کاربر render خودش رو می‌ده
  render,
  ...rest
}) => {
  const finalRender = render;

  return (
    <label className="field">
      <span className="label-text">{label}</span>

      {finalRender ? (
        // کاربر render خودش رو داده
        <Field name={name}>
          {({ field, form, meta }) =>
            finalRender({ field, form, meta, name, label })
          }
        </Field>
      ) : (
        // منطق عمومی و قابل تنظیم
        <Field name={name}>
          {({ field, form }) => {
            const handleChange = (e) => {
              let value = e.target.value;

              // 1. فقط عدد
              if (onlyNumbers) {
                value = value.replace(/[^0-9]/g, "");
              }

              // 2. فقط حروف
              if (onlyLetters) {
                value = value.replace(/[^A-Za-z]/g, "");
              }

              // 3. تبدیل به حروف بزرگ/کوچک
              if (toUpperCase) value = value.toUpperCase();
              if (toLowerCase) value = value.toLowerCase();

              // 4. حداکثر طول
              if (maxLength && value.length > maxLength) {
                value = value.slice(0, maxLength);
              }

              // 5. حداقل طول (فقط برای اعتبارسنجی، نه کوتاه کردن)
              // این در Yup انجام می‌شه، اینجا فقط مقدار رو می‌فرستیم

              form.setFieldValue(name, value);
            };

            return (
              <input
                {...field}
                type={type}
                value={field.value || ""}
                onChange={handleChange}
                placeholder={placeholder}
                inputMode={inputMode}
                maxLength={maxLength}
                {...rest}
              />
            );
          }}
        </Field>
      )}

      <ErrorMessage name={name} component={component} />
    </label>
  );
};

export default Input;