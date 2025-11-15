import React from "react";
import { Field, ErrorMessage } from "formik";
import CustomizeError from "./CustomizeError";

const FavoritFeilds = ({ push, remove, form }) => {
  const { favorits } = form.values;

  return (
    <div className="favorits-section">
      <div className="label-text">
        <span>علایق من</span>
        <button
          type="button"
          onClick={() => {
            push(""); // درست کار می‌کنه، چون FieldArray خودش مدیریت می‌کنه
          }}
          className="add-btn"
        >
          افزودن
        </button>
      </div>

      {favorits && favorits.length > 0 ? (
        favorits.map((_, index) => (
          <div key={index} className="favorit-item">
            <Field
              type="text"
              placeholder="مثلاً: فوتبال"
              name={`favorits[${index}]`}
            />
            <ErrorMessage
              name={`favorits[${index}]`}
              component={CustomizeError}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="remove-btn"
            >
              حذف
            </button>
          </div>
        ))
      ) : (
        <p>هیچ علاقه‌ای اضافه نشده.</p>
      )}
    </div>
  );
};

export default FavoritFeilds;