import React, { useRef, useState, useEffect } from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import { loadUserDataService, addUserService } from "../features/services/UserServices";

const AddUser = () => {
  const initialState = {
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    province: "",
    postalCode: "",
    address: "",
  };

  const { userId } = useParams();
  const navigate = useNavigate();
  const params = useLocation();
  const editUserId = params?.state?.id || userId;

  const [userData, setUserData] = useState(initialState);
  const [tempData, setTempData] = useState(initialState);
  const typingTimeoutRef = useRef(null);

  // 🔹 اضافه یا ویرایش کاربر
  const handleAddUser = async (e) => {
    e.preventDefault();
    await addUserService(editUserId, tempData);
    resetForm();
  };

  // 🔹 ریست فرم
  const resetForm = () => {
    setTempData(initialState);
    setUserData(initialState);
  };

  // 🔹 بارگذاری داده کاربر برای ویرایش
  useEffect(() => {
    if (!editUserId) return;
    let isMounted = true;

    loadUserDataService(editUserId).then((resultData) => {
      if (isMounted && resultData) {
        const newUser = {
          fullName: resultData.name,
          userName: resultData.username,
          email: resultData.email,
          phone: resultData.phone,
          province: resultData.address.city,
          postalCode: resultData.address.zipcode,
          address: resultData.address.street,
        };
        setUserData(newUser);
        setTempData(newUser);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [editUserId]);

  // 🔹 آپدیت داده‌ها با تاخیر 500ms هنگام تایپ
  useEffect(() => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setUserData(tempData);
    }, 500);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [tempData]);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow p-4 rounded-4 w-100">
          <h3 className="text-center mb-4">
            {userId ? "ویرایش کاربر" : "ثبت کاربر"}
          </h3>

          <form onSubmit={handleAddUser}>
            <div className="row">
              {/* ستون اول */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">نام کامل</label>
                  <input
                    value={tempData.fullName}
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="مثلاً شادی اژدری"
                    required
                    onChange={(e) => setTempData({ ...tempData, fullName: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">نام کاربری</label>
                  <input
                    value={tempData.userName}
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="shadi_ajdari"
                    required
                    onChange={(e) => setTempData({ ...tempData, userName: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">ایمیل</label>
                  <input
                    value={tempData.email}
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="example@email.com"
                    required
                    onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">شماره تلفن</label>
                  <input
                    value={tempData.phone}
                    type="text"
                    id="phone"
                    className="form-control"
                    placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
                    required
                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* ستون دوم */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="province" className="form-label">استان</label>
                  <input
                    value={tempData.province}
                    type="text"
                    id="province"
                    className="form-control"
                    placeholder="مثلاً تهران"
                    required
                    onChange={(e) => setTempData({ ...tempData, province: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="postalCode" className="form-label">کد پستی</label>
                  <input
                    value={tempData.postalCode}
                    type="text"
                    id="postalCode"
                    className="form-control"
                    placeholder="مثلاً 1234567890"
                    required
                    onChange={(e) => setTempData({ ...tempData, postalCode: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">آدرس</label>
                  <textarea
                    value={tempData.address}
                    id="address"
                    className="form-control"
                    placeholder="خیابان، کوچه، پلاک..."
                    rows="3"
                    required
                    onChange={(e) => setTempData({ ...tempData, address: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <button type="submit" className="btn btn-primary mx-1 w-100 mt-3">
                {userId ? "ویرایش" : "ثبت"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-danger w-100 mx-1 mt-3"
              >
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
