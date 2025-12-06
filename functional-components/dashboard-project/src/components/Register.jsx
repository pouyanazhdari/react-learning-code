import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import InputField from './formikElements/InputField';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from "axios";
const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    authMode: "",
    agreeToTerms: false
}
const handleSubmit = async (userData) => {
    // try {
    //     const response = 
        
    // } catch (error) {
        
    // }
}
const validationSchema = Yup.object({
    username: Yup.string().required("نام‌کاربری اجباری است"),
    phone: Yup.string()
        .required("شماره موبایل اجباری است")
        .matches(/^09[0-9]{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد"),
    firstName: Yup.string().required("فیلد نام اجباری است"),
    lastName: Yup.string().required("فیلد نام‌خانوادگی اجباری است"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل اجباری است"),
    password: Yup.string()
        .required("رمز عبور اجباری است")
        .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
        // ),
        ,
    confirmPassword: Yup.string()
        .required("تکرار رمز عبور اجباری است")
        .oneOf([Yup.ref('password'), null], "تکرار رمز عبور با رمز عبور وارد شده مطابقت ندارد")
})
const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">

            {/* گرادیانت‌های متحرک */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "0s" }}></div>
                <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "2s" }}></div>
                <div className="absolute -bottom-40 left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: "4s" }}></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl m-4 px-8"> {/* max-w-4xl برای صفحه بزرگتر */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/50">

                    {/* هدر صفحه */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ثبت‌نام
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm">اطلاعات خود را برای ایجاد حساب وارد کنید</p>
                    </div>

                    {/* فرم ثبت‌نام */}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                    >
                        {formik => {
                            return (
                                <Form className="space-y-8">
                                    {/* بخش اطلاعات حساب */}

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                            <i className="fas fa-lock mr-2 text-green-500"></i>
                                            اطلاعات حساب
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* فیلد نام کاربری */}
                                            <InputField
                                                name="username"
                                                label="نام کاربری"
                                                type="text"
                                                placeholder="username"
                                                icon="fas fa-at"
                                                errorVariant="tooltip"
                                            />

                                            {/* فیلد ایمیل */}
                                            <InputField
                                                name="email"
                                                label="آدرس ایمیل"
                                                type="email"
                                                placeholder="example@email.com"
                                                icon="fas fa-envelope"
                                                errorVariant="tooltip"
                                            />

                                            {/* فیلد رمز عبور */}
                                            <InputField
                                                name="password"
                                                label="رمز عبور"
                                                type="password"
                                                placeholder="••••••••"
                                                icon="fas fa-lock"
                                                errorVariant="tooltip"
                                            />

                                            {/* فیلد تکرار رمز عبور */}
                                            {/* <div className="md:col-span-2"> */}
                                                <InputField
                                                    name="confirmPassword"
                                                    label="تکرار رمز عبور"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    icon="fas fa-lock"
                                                    errorVariant="tooltip"
                                                />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    {/* بخش اطلاعات شخصی */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                            <i className="fas fa-user-circle mr-2 text-blue-500"></i>
                                            اطلاعات شخصی
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* فیلد نام */}
                                            <InputField
                                                name="firstName"
                                                label="نام"
                                                type="text"
                                                placeholder="علی"
                                                icon="fas fa-user"
                                                errorVariant="tooltip"
                                                onlyLetters={true}
                                            />

                                            {/* فیلد نام خانوادگی */}
                                            <InputField
                                                name="lastName"
                                                label="نام خانوادگی"
                                                type="text"
                                                placeholder="محمدی"
                                                icon="fas fa-user-friends"
                                                errorVariant="tooltip"
                                                onlyLetters={true}
                                            />
                                            
                                            {/* فیلد شماره تلفن */}
                                            <InputField
                                                name="phone"
                                                label="شماره تلفن"
                                                type="tel"
                                                placeholder="0912 345 6789"
                                                icon="fas fa-phone"
                                                errorVariant="tooltip"
                                                onlyNumbers={true}
                                                maxLength={11}
                                            />
                                        </div>
                                    </div>



                                    {/* بخش قوانین */}
                                    {/* <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-100 p-3 rounded-xl">
                                                <i className="fas fa-file-contract text-blue-600 text-xl"></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="agreeToTerms"
                                                        checked={values.agreeToTerms}
                                                        onChange={(e) => setFieldValue('agreeToTerms', e.target.checked)}
                                                        className="mt-1 w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <div>
                                                        <label htmlFor="agreeToTerms" className="text-gray-800 font-medium block mb-2">
                                                            موافقت با قوانین
                                                        </label>
                                                        <p className="text-sm text-gray-600">
                                                            با ایجاد حساب، با{' '}
                                                            <a href="#" className="text-blue-600 hover:underline font-medium">
                                                                شرایط استفاده
                                                            </a>{' '}
                                                            و{' '}
                                                            <a href="#" className="text-blue-600 hover:underline font-medium">
                                                                حریم خصوصی
                                                            </a>{' '}
                                                            موافقت می‌کنم.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* دکمه ثبت‌نام */}
                                    <div className="text-center pt-4">
                                        <button
                                            type="submit"
                                            className="w-full md:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 min-w-[200px]"
                                        >
                                            <i className="fas fa-user-plus ml-2"></i>
                                            ایجاد حساب کاربری
                                        </button>
                                    </div>

                                </Form>
                            )
                        }}

                    </Formik>

                    {/* جداکننده */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-gray-500 text-sm">یا با شبکه اجتماعی ادامه دهید</span>
                        </div>
                    </div>

                    {/* دکمه‌های ثبت‌نام با شبکه‌های اجتماعی */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-all hover:border-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            ادامه با Google
                        </button>

                        <button className="flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] rounded-2xl text-white font-medium hover:bg-[#166FE5] transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            ادامه با Facebook
                        </button>
                    </div>

                    {/* لینک ورود */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-600">
                            قبلاً حساب دارید؟{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
                            >
                                وارد شوید
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;