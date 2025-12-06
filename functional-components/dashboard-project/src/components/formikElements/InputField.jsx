import React from 'react';
import { FastField, Field } from 'formik';
import ErrorMessage from './ErrorMessage.jsx';


const InputField = ({
  name,
  label,
  icon,
  type = "text",
  placeholder,
  errorVariant = "simple",
  showErrorIcon = true,
  onlyNumbers = false,
  onlyLetters = false,
  maxLength,
  minLength,
  toUpperCase,
  toLowerCase,
  ...rest
}) => {


  const filterValue = (value) => {
    let filteredValue = value;
    if (onlyNumbers) {
      // فقط اعداد را نگه می‌دارد
      filteredValue = filteredValue.replace(/[^0-9]/g, '');
    }
    if (onlyLetters) {
      // فقط حروف فارسی و انگلیسی و فاصله را نگه می‌دارد
      filteredValue = filteredValue.replace(/[^a-zA-Zآ-ی\s]/g, '');
    }
    if (maxLength !== undefined && filteredValue.length > maxLength) {
      filteredValue = filteredValue.substring(0, maxLength);
    }

    //  تبدیل به حروف بزرگ/کوچک
    if (toUpperCase) filteredValue = filteredValue.toUpperCase();
    if (toLowerCase) filteredValue = filteredValue.toLowerCase();

    return filteredValue;
  };



  return (
    <div className="mb-1 relative"> {/* mb-8 برای فضای کافی زیر فیلد */}
      {label && (
        <label
          htmlFor={`InputField-${name}`}
          className="block text-sm font-semibold text-gray-800 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <i className={`${icon} absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-10`}></i>
        )}
        <Field name={name}>
          {({ form, field }) => {
            const handleChange = (e) => {
              let value = e.target.value;
              // اعمال فیلترها
              value = filterValue(value);
              // به روز رسانی مقدار فیلد در formik
              form.setFieldValue(name, value);
            }
            return (
              <input
                id={`InputField-${name}`}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={field.onBlur}
                value={field.value || ""}
                className={`
            w-full px-4 py-3 ${icon ? 'pl-12' : 'pl-5'} pr-4 
            rounded-2xl border-2 border-gray-200 
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 
            transition-all duration-300 outline-none 
            text-gray-800 placeholder-gray-500 bg-white
            hover:border-gray-300
            peer
            ${rest.className || ''}
          `}
                {...rest} />
            )
          }}

        </Field>
        {/* پیغام خطا - absolute و بدون جابجایی المان‌ها */}
        <ErrorMessage
          name={name}
          variant={errorVariant}
          showIcon={showErrorIcon}
        />
      </div>
    </div>
  );
};

export default InputField;

