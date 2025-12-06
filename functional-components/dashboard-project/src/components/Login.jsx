import React from 'react';
import * as Yup from "yup"
import InputField from './formikElements/InputField';
import { Link } from 'react-router-dom';
import {
    Formik,
    Form,
} from "formik";

const initValues = {
    password: "",
    email: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل اجباری است"),
    password: Yup.string()
        .min(8, "رمز باید حداقل 8 کاراکتر باشد")
        .required("رمز عبور اجباری است"),
})

const handleSubmit = (values) => {
    console.log(values);
    // در اینجا می‌توانید درخواست HTTP به سرور را انجام دهید
}
const Login = () => {

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">

                {/* گرادیانت‌های متحرک شاد و نرم */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "0s" }}></div>
                    <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute -bottom-40 left-40 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "4s" }}></div>
                    <div className="absolute bottom-20 -left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: "6s" }}></div>
                </div>

                <div className="relative z-10 w-full max-w-md px-8">
                    <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/50">

                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                                خوش آمدید
                            </h1>
                            <p className="text-gray-500 mt-3 text-sm">لطفاً وارد شوید</p>
                        </div>
                        <Formik
                            initialValues={initValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            validateOnChange={true}
                        >
                            {formik => {
                                return (

                                    <Form className="space-y-6">
                                        {/* فیلد ایمیل */}
                                        <InputField
                                            name="email"
                                            label="آدرس ایمیل"
                                            type="email"
                                            placeholder="example@email.com"
                                            icon="fas fa-envelope"
                                            errorVariant="tooltip"
                                            showErrorIcon={true}
                                        />

                                        {/* فیلد رمز عبور */}
                                        <InputField
                                            name="password"
                                            label="رمز عبور"
                                            type="password"
                                            placeholder="••••••••"
                                            icon="fas fa-lock"
                                            errorVariant="tooltip"
                                            showErrorIcon={true}
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                                        >
                                            ورود به حساب
                                        </button>
                                    </Form>
                                )
                            }}
                        </Formik>

                        <div className="text-center mt-6 text-sm">
                            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">رمز عبور را فراموش کردید؟</a>
                        </div>

                        <p className="text-center mt-8 text-gray-600 text-sm">
                            حساب ندارید؟ <Link to="/register" className="text-purple-600 font-semibold hover:underline">ثبت‌نام کنید</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;