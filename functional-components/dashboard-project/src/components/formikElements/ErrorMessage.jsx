import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';

const ErrorMessage = ({
    name,
    errorClassName = "",
    showIcon = true,
    variant = "default"
}) => {
    const variants = {
        // حالت پیش‌فرض - خطا زیر فیلد بدون جابجایی المان‌ها
        default: ({ errorMessage }) => (
            <div className="absolute left-0 top-full mt-1 flex items-start gap-2 text-red-600 z-10 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-red-100 animate-fadeIn">
                {showIcon && (
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )}
                <span className="text-sm font-medium leading-tight">{errorMessage}</span>
            </div>
        ),

        // حالت توپ‌تپ (tooltip) - خطا بالای فیلد
        tooltip: ({ errorMessage }) => (
            <div className="absolute left-0 -top-2 transform -translate-y-full mb-2 z-50">
                <div className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap animate-fadeIn">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate max-w-xs">{errorMessage}</span>
                    {/* پیکان پایین */}
                    <div className="absolute -bottom-2 left-4 w-3 h-3 bg-red-500 transform rotate-45"></div>
                </div>
            </div>
        ),

        // حالت سمت راست فیلد
        inlineRight: ({ errorMessage }) => (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-10">
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-md border border-red-200 whitespace-nowrap animate-fadeIn">
                    {showIcon && (
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    )}
                    {errorMessage}
                </div>
            </div>
        ),

        // حالت ساده بدون باکس
        simple: ({ errorMessage }) => (
            <div className="absolute left-0 top-full mt-1 text-red-500 text-sm font-medium animate-fadeIn">
                {errorMessage}
            </div>
        )
    };

    const SelectedVariant = variants[variant] || variants.default;

    return (
        <FormikErrorMessage name={name}>
            {(errorMessage) => (
                <SelectedVariant errorMessage={errorMessage} />
            )}
        </FormikErrorMessage>
    );
};

export default ErrorMessage;