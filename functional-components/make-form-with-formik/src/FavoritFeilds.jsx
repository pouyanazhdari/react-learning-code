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
          onClick={() => push("")}
          className="btn add-btn"
        >
          افزودن
        </button>
      </div>

      {favorits && favorits.length > 0 ? (
        favorits.map((_, index) => (
          <div key={index} className="favorit-item field">
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
              className="btn remove-btn"
            >
              حذف
            </button>
          </div>
        ))
      ) : (
        <p className="muted-text">هیچ علاقه‌ای اضافه نشده.</p>
      )}
    </div>
  );
};

export default FavoritFeilds;
