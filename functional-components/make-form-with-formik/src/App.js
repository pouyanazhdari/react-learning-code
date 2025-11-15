// src/App.jsx
import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FastField,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import CustomizeError from "./CustomizeError";
import FavoritFeilds from "./FavoritFeilds";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  bio: "",
  address: {
    postalCode: "",
    city: "",
  },
  phone: ["", ""],
  favorits: [""],
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("نام و نام خانوادگی اجباری است"),
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل اجباری است"),
  password: Yup.string()
    .min(8, "رمز باید حداقل 8 کاراکتر باشد")
    .required("رمز عبور اجباری است"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند")
    .required("تکرار رمز عبور اجباری است"),
  bio: Yup.string().required("بیوگرافی اجباری است"),
  address: Yup.object({
    city: Yup.string().required("شهر اجباری است"),
    postalCode: Yup.string()
      .transform((value) => value.replace(/[^0-9]/g, ""))
      .test("len", "کد پستی باید 10 رقم باشد", (val) => val?.length === 10)
      .required("کد پستی اجباری است"),
  }),
  phone: Yup.array()
    .of(
      Yup.string()
        .transform((value) => value.replace(/[^0-9]/g, ""))
        .test("len", "شماره باید 11 رقم باشد", (val) => !val || val.length === 11)
        .nullable()
    )
    .min(1, "حداقل یک شماره موبایل وارد کنید"),
  favorits: Yup.array()
    .of(Yup.string().required("علاقه نمی‌تواند خالی باشد"))
    .min(1, "حداقل یک علاقه وارد کنید"),
});

const onSubmit = (values, { setSubmitting }) => {
  const { rePassword, ...cleanData } = values;
  console.log("داده‌های تمیز:", cleanData);
  setTimeout(() => {
    setSubmitting(false);
  }, 1000); // شبیه‌سازی ارسال
};

function App() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => (
        <div className="signup-root">
          <div className="card">
            <div className="brand">
              <svg className="logo" viewBox="0 0 24 24">
                <path d="M12 2l3.2 6.5L22 9l-5 4.3L18 21l-6-3.2L6 21l1-7.7L2 9l6.8-.5L12 2z" />
              </svg>
              <h2>فرم ثبت نام</h2>
            </div>

            <Form className="form">
              {/* نام و نام خانوادگی */}
              <label className="field">
                <span className="label-text">نام و نام خانوادگی</span>
                <FastField type="text" placeholder="مثلاً: پویان اژدری" name="fullName" />
                <ErrorMessage name="fullName" component={CustomizeError} />
              </label>

              {/* ایمیل */}
              <label className="field">
                <span className="label-text">ایمیل</span>
                <FastField type="email" placeholder="example@mail.com" name="email" />
                <ErrorMessage name="email" component="small" />
              </label>

              {/* رمز و تکرار */}
              <div className="two-cols">
                <label className="field">
                  <span className="label-text">رمز عبور</span>
                  <FastField type="password" name="password" placeholder="حداقل ۸ کاراکتر" />
                  <ErrorMessage name="password" component={CustomizeError} />
                </label>

                <label className="field">
                  <span className="label-text">تکرار رمز</span>
                  <FastField type="password" name="rePassword" placeholder="تکرار رمز" />
                  <ErrorMessage name="rePassword" component={CustomizeError} />
                </label>
              </div>

              {/* شهر و کد پستی */}
              <div className="two-cols">
                <label className="field">
                  <span className="label-text">شهر</span>
                  <FastField type="text" name="address.city" placeholder="تهران" />
                  <ErrorMessage name="address.city" component={CustomizeError} />
                </label>

                <label className="field">
                  <span className="label-text">کد پستی</span>
                  <Field name="address.postalCode">
                    {({ field, form }) => {
                      const handleChange = (e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                        form.setFieldValue("address.postalCode", value);
                      };

                      return (
                        <input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          placeholder="1234567890"
                          value={field.value || ""}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="address.postalCode" component={CustomizeError} />
                </label>
              </div>

              {/* شماره موبایل */}
              <div className="two-cols">
                <label className="field">
                  <span className="label-text">شماره موبایل ۱</span>
                  <Field name="phone[0]">
                    {({ field, form }) => {
                      const handleChange = (e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                        form.setFieldValue("phone[0]", value);
                      };

                      return (
                        <input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          placeholder="09123456789"
                          value={field.value || ""}
                          onChange={handleChange}
                          maxLength={11}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="phone[0]" component={CustomizeError} />
                </label>

                <label className="field">
                  <span className="label-text">شماره موبایل ۲ (اختیاری)</span>
                  <Field name="phone[1]">
                    {({ field, form }) => {
                      const handleChange = (e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                        form.setFieldValue("phone[1]", value);
                      };

                      return (
                        <input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          placeholder="09129876543"
                          value={field.value || ""}
                          onChange={handleChange}
                          maxLength={11}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="phone[1]" component={CustomizeError} />
                </label>
              </div>

              {/* بیوگرافی */}
              <label className="field">
                <span className="label-text">بیوگرافی</span>
                <FastField as="textarea" placeholder="درباره خودت بنویس" name="bio" rows={3} />
                <ErrorMessage name="bio" component={CustomizeError} />
              </label>

              {/* علایق */}
              <label className="field">
                <FieldArray name="favorits">
                  {(props) => <FavoritFeilds {...props} />}
                </FieldArray>
              </label>

              {/* چک‌باکس */}
              <label className="checkbox-field">
                <input type="checkbox" required />
                <span>شرایط و قوانین را می‌پذیرم</span>
              </label>

              {/* دکمه ارسال */}
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="btn"
              >
                {formik.isSubmitting ? "در حال ارسال..." : "ثبت نام"}
              </button>
            </Form>
          </div>

          <div className="art">
            <div className="gradient-circle"></div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default App;