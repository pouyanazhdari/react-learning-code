import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    console.log(userId)
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow p-4 rounded-4 w-100">
                    <h3 className="text-center mb-4">
                        {userId ? "ویرایش" : "ثبت کاربر"}
                    </h3>

                    <form>
                        <div className="row">
                            {/* ستون اول */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">نام کامل</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="form-control"
                                        placeholder=" شادی اژدری"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">نام کاربری</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder=" shadi_ajdari"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">ایمیل</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="example@email.com"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">رمز عبور</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="********"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="nationalId" className="form-label">شماره شناسنامه</label>
                                    <input
                                        type="text"
                                        id="nationalId"
                                        className="form-control"
                                        placeholder="مثلاً ۱۲۳۴۵۶۷۸۹۰"
                                        required
                                    />
                                </div>
                            </div>

                            {/* ستون دوم */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="province" className="form-label">استان</label>
                                    <input
                                        type="text"
                                        id="province"
                                        className="form-control"
                                        placeholder="مثلاً تهران"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">شهر</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="form-control"
                                        placeholder="مثلاً کرج"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="postalCode" className="form-label">کد پستی</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        className="form-control"
                                        placeholder="مثلاً 1234567890"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">آدرس</label>
                                    <textarea
                                        id="address"
                                        className="form-control"
                                        placeholder="خیابان، کوچه، پلاک..."
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>


                            </div>
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-primary mx-1 w-100 mt-3">
                                {userId ? "ویرایش" : "ثبت"}
                            </button>
                            <button
                            onClick={()=>navigate(-1)}
                            
                            className="btn btn-danger w-100 mx-1 mt-3">
                                بازگشت
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <Outlet />
        </>

    );
};

export default AddUser;
