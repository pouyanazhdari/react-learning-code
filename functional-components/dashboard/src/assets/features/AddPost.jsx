import React, { useRef, useState, useEffect } from "react";
import { useParams , useNavigate, useLocation } from "react-router-dom";
import { loadPostDataService, addPostService } from "../features/services/PostServices";
const AddPost = () => {
    const initialState = {
        userId: "",
        title: "",
        body: "",
    };
    const { postId } = useParams();
    const navigate = useNavigate();
    const params = useLocation();
    const editPostId = params?.state?.id || postId;

    const [postData, setPostData] = useState(initialState);
    const [tempData, setTempData] = useState(initialState);
    const typingTimeoutRef = useRef(null);
    // 🔹 اضافه یا ویرایش کاربر
    const handleAddPost = async (e) => {
        e.preventDefault();
        await addPostService(editPostId, tempData);
        resetForm();
    };

    // 🔹 ریست فرم
    const resetForm = () => {
        setTempData(initialState);
        setPostData(initialState);
    };

    // 🔹 بارگذاری داده کاربر برای ویرایش
    useEffect(() => {
        if (!editPostId) return;
        let isMounted = true;

        loadPostDataService(editPostId).then((resultData) => {
            if (isMounted && resultData) {
                const newPost = {
                    userId: resultData.userId,
                    title: resultData.title,
                    body: resultData.body,
                };
                setPostData(newPost);
                setTempData(newPost);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [editPostId]);

    // 🔹 آپدیت داده‌ها با تاخیر 500ms هنگام تایپ
    useEffect(() => {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setPostData(tempData);
        }, 500);

        return () => clearTimeout(typingTimeoutRef.current);
    }, [tempData]);
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4 rounded-4 w-100">
                <h3 className="text-center mb-4">
                    {postId ? "ویرایش پست" : "ثبت پست جدید"}
                </h3>

                <form onSubmit={handleAddPost}>
                    {/* شناسه کاربری */}
                    <div className="mb-3 w-100">
                        <label htmlFor="fullName" className="form-label">شناسه کاربری</label>
                        <input
                            value={tempData.userId}
                            type="text"
                            id="fullName"
                            className="form-control w-100"
                            placeholder="شادی اژدری"
                            required
                            onChange={(e) => setTempData({ ...tempData, userId: e.target.value })}
                        />
                    </div>

                    {/* عنوان پست */}
                    <div className="mb-3 w-100">
                        <label htmlFor="username" className="form-label">عنوان پست</label>
                        <input
                            value={tempData.title}
                            type="text"
                            id="username"
                            className="form-control w-100"
                            placeholder="shadi_ajdari"
                            required
                            onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                        />
                    </div>

                    {/* متن پست */}
                    <div className="mb-3 w-100">
                        <label htmlFor="postBody" className="form-label">متن پست</label>
                        <textarea
                            value={tempData.body}
                            id="postBody"
                            className="form-control w-100"
                            placeholder="متن پست خود را وارد کنید"
                            rows={5}
                            required
                            onChange={(e) => setTempData({ ...tempData, body: e.target.value })}

                        />
                    </div>

                    {/* دکمه‌ها */}
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary w-100">
                            {postId ? "ویرایش" : "ثبت"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-danger w-100"
                        >
                            بازگشت
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
