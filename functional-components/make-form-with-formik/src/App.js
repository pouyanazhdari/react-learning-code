// App.jsx
import React, { useState, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import CustomizeError from "./CustomizeError";
import FavoritFeilds from "./FavoritFeilds";
import FormikElements from "./formikElements/FormikElememts";

// آرایه education داخل کامپوننت
const education = [
  { id: 1, value: "دیپلم" },
  { id: 2, value: "کارشناسی" },
  { id: 3, value: "کارشناسی ارشد" },
  { id: 4, value: "دکتری" },
  { id: 5, value: "پست دکتری" },
];
const skils = [
  { id: 1, value: "htnl" },
  { id: 2, value: "css" },
  { id: 3, value: " js" },
  { id: 4, value: "react" },
  { id: 5, value: "mvc .net Core" },
];
const gender = [
  { id: "male", value: "مرد" },
  { id: "female", value: "زن" },
];

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  rePassword: "",
  bio: "",
  address: { postalCode: "", city: "" },
  phone: ["", ""],
  favorits: [],
  // terms: false,
  education: "",
  gender: "",
  skils: [],
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("نام و نام خانوادگی اجباری است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل اجباری است"),
  password: Yup.string()
    .min(8, "رمز باید حداقل 8 کاراکتر باشد")
    .required("رمز عبور اجباری است"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند")
    .required("تکرار رمز عبور اجباری است"),
  bio: Yup.string().required("بیوگرافی اجباری است"),
  education: Yup.string().required("تحصیلات اجباری است"),
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
        .test(
          "len",
          "شماره باید 11 رقم باشد",
          (val) => !val || val.length === 11
        )
        .nullable()
    )
    .min(1, "حداقل یک شماره موبایل وارد کنید"),
  favorits: Yup.array()
    .of(Yup.string().required("علاقه نمی‌تواند خالی باشد"))
    .min(1, "حداقل یک علاقه وارد کنید"),
  // terms: Yup.boolean().oneOf([true], "باید شرایط را بپذیرید"),
});

const onSubmit = (values, { setSubmitting, resetForm }) => {
  // const { rePassword, terms, ...cleanData } = values;
  const { rePassword, ...cleanData } = values;
  console.log("داده‌های تمیز:", cleanData);

  setTimeout(() => {
    localStorage.setItem("saveData", JSON.stringify(cleanData));
    setSubmitting(false);
    resetForm();
  }, 1000);
};

export default function App() {
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("saveData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedData({
          ...initialValues,
          ...parsed,
          rePassword: "",
          // terms: false,
        });
        // ⬇ بعد از load، اعتبارسنجی اجرا نمی‌شود
      } catch (e) {
        console.error("خطا در خواندن localStorage:", e);
      }
    }
  }, []);

  return (
    <Formik
      initialValues={savedData || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
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
              <FormikElements
                control="input"
                label="نام و نام خانوادگی"
                type="text"
                name="fullName"
                placeholder="مثلاً: پویان اژدری"
              />

              {/* ایمیل */}
              <FormikElements
                control="input"
                label="ایمیل"
                type="email"
                name="email"
              />

              {/* رمز و تکرار */}
              <div className="two-cols">
                <FormikElements
                  control="input"
                  label="رمز عبور"
                  type="password"
                  name="password"
                />
                <FormikElements
                  control="input"
                  label="تکرار رمز عبور"
                  type="password"
                  name="rePassword"
                />
              </div>

              {/* شهر و کد پستی */}
              <div className="two-cols">
                <FormikElements
                  control="input"
                  label="شهر"
                  type="text"
                  name="address.city"
                  placeholder="تهران"
                />
                <FormikElements
                  control="input"
                  label="کد پستی"
                  name="address.postalCode"
                  onlyNumbers={true}
                  maxLength={10}
                  placeholder="1234567890"
                />
              </div>

              {/* شماره موبایل */}
              <div className="two-cols">
                <FormikElements
                  control="input"
                  label="موبایل"
                  name="phone[0]"
                  render={({ field, form }) => {
                    const handleChange = (e) => {
                      let value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 11);
                      if (value && !value.startsWith("09")) {
                        value = "09" + value.replace(/^09+/, "");
                      }
                      form.setFieldValue("phone[0]", value);
                    };
                    return (
                      <input
                        {...field}
                        onChange={handleChange}
                        placeholder="09123456789"
                        inputMode="numeric"
                      />
                    );
                  }}
                />
                <FormikElements
                  control="input"
                  label="موبایل دوم (اختیاری)"
                  name="phone[1]"
                  render={({ field, form }) => {
                    const handleChange = (e) => {
                      let value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 11);
                      if (value && !value.startsWith("09")) {
                        value = "09" + value.replace(/^09+/, "");
                      }
                      form.setFieldValue("phone[1]", value);
                    };
                    return (
                      <input
                        {...field}
                        onChange={handleChange}
                        placeholder="09123456789"
                        inputMode="numeric"
                      />
                    );
                  }}
                />
              </div>

              {/* تحصیلات — SelectBox */}
              <FormikElements
                control="select"
                label="تحصیلات"
                name="education"
                options={education}
                placeholder="یک گزینه انتخاب کنید"
              />

              {/* جنسیت — Radio */}
              <FormikElements
                control="radio"
                label="جنسیت"
                name="gender"
                options={gender}
              />

              {/* مهارت — Checkbox */}
              <FormikElements
                control="checkbox"
                label="مهارت"
                name="skils"
                options={skils}
              />

              {/* بیوگرافی */}
              <FormikElements
                control="textarea"
                label="بیوگرافی"
                name="bio"
                placeholder="راجب خودت بنویس"
                rows="3"
              />

              {/* علایق */}
              <label className="field">
                <span className="label-text">علایق</span>
                <FieldArray name="favorits">
                  {(arrayHelpers) => <FavoritFeilds {...arrayHelpers} />}
                </FieldArray>
              </label>

              {/* چک‌باکس terms */}
              {/* <FormikElements control="checkbox" name="terms"
                options={[{id:1,value:شرت}]}
              /> */}

              {/* دکمه ارسال */}
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="btn"
                style={{
                  backgroundColor: formik.isValid ? "#3498db" : "#95a5a6",
                  cursor: formik.isValid ? "pointer" : "not-allowed",
                }}
              >
                {formik.isSubmitting ? "در حال ارسال..." : "ثبت نام"}
              </button>

              {/* دیباگ */}
              <div
                style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}
              >
                <p>
                  <strong>isValid:</strong>{" "}
                  {formik.isValid ? "true" : "false"}
                </p>
                <p>
                  <strong>isSubmitting:</strong>{" "}
                  {formik.isSubmitting ? "true" : "false"}
                </p>
                <p>
                  <strong>errors:</strong> {Object.keys(formik.errors).length}
                </p>
              </div>
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
