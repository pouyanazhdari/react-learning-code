import React from "react";
import { useFormik } from "formik"
import * as Yup from "yup";
const initialValues = {
  fullName: "",
  email: "",
  password: ""
}
const onSubmit = (values) => {
  console.log(values);
}
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("این فیلد اجباری است"),
    email: Yup.string()
      .email("ایمیل معتبر نیست")
      .required("این فیلد اجباری است"),
    password: Yup.string()
      .min(8, "رمز باید حداقل 8 کاراکتر باشد")
      .required("این فیلد اجباری است")
  });
// const validate = (values) => {
//   let errors = {}
//   if (!values.fullName) {
//     errors.fullName = "این فیلد اجباری میباشد "
//   }

//   if (!values.email) {
//     errors.email = "این فیلد اجباری میباشد";
//   } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
//     errors.email = "قالب ایمیل نادرست است";
//   }
//   if (!values.password) {
//     errors.password = "این فیلد اجباری میباشد "
//   }
//   return errors
// }
function App() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <div className="signup-root">

      <div className="card">
        <div className="brand">
          <svg className="logo" viewBox="0 0 24 24">
            <path d="M12 2l3.2 6.5L22 9l-5 4.3L18 21l-6-3.2L6 21l1-7.7L2 9l6.8-.5L12 2z" />
          </svg>
          <h2>فرم ثبت نام</h2>
        </div>

        <form className="form" onSubmit={formik.handleSubmit} noValidate>

          <label className="field">
            <span className="label-text">نام و نام خانوادگی</span>
            <input type="text"
              placeholder="مثلاً: پویان اژدری"
              name="fullName"
              {...formik.getFieldProps("fullName")}
            />
            {formik.errors.fullName && formik.touched.fullName ? <small>{formik.errors.fullName}</small> : null}
          </label>

          <label className="field">
            <span className="label-text">ایمیل</span>
            <input type="email"
              placeholder="example@mail.com"
              name="email"
              {...formik.getFieldProps("email")}

            />
            {formik.errors.email && formik.touched.email ? <small>{formik.errors.email}</small> : null}
          </label>

          <div className="two-cols">
            <label className="field">
              <span className="label-text">رمز عبور</span>
              <input type="password"
                placeholder="حداقل ۸ کاراکتر"
                name="password"
                {...formik.getFieldProps("password")}

              />
              {formik.errors.password && formik.touched.password ? <small>{formik.errors.password}</small> : null}
            </label>

            <label className="field">
              <span className="label-text">تکرار رمز</span>
              <input type="rePassword" placeholder="تکرار رمز" />
            </label>
          </div>

          <label className="checkbox-field">
            <input type="checkbox" />
            <span>شرایط و قوانین را می‌پذیرم</span>
          </label>

          <button className="btn" type="submit">ثبت نام</button>

          <div className="footer">
            <p>حساب دارید؟ <a href="#">ورود</a></p>
          </div>

        </form>
      </div>

      <div className="art">
        <div className="gradient-circle"></div>
      </div>

    </div>


  );
}

export default App;
