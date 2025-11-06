import React, { useRef, useState, useEffect, useReducer, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { loadPostDataService, addPostService } from "../features/services/PostServices";
import { getUsersDataService } from "../features/services/UserServices";

const initialState = {
    userId: "",
    title: "",
    body: "",
};

const postReducer = (state, action) => {
    switch (action.type) {
        case "SET_POST":
            return { ...action.payload };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const AddPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const editPostId = location?.state?.id || postId;

    const [postData, dispatch] = useReducer(postReducer, initialState);
    const [tempData, setTempData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const typingTimeoutRef = useRef(null);

    // درست: useCallback با dependency خالی
    const handleChange = useCallback((field, value) => {
        setTempData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();
        await addPostService(editPostId, tempData);
        resetForm();
    };

    const resetForm = () => {
        dispatch({ type: "RESET" });
        setTempData(initialState);
    };

    useEffect(() => {
        getUsersDataService().then((data) => setUsers(data));
    }, []);

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
                dispatch({ type: "SET_POST", payload: newPost });
                setTempData(newPost);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [editPostId]);

    useEffect(() => {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            dispatch({ type: "SET_POST", payload: tempData });
        }, 500);

        return () => clearTimeout(typingTimeoutRef.current);
    }, [tempData]);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: "600px" }}>
                <h3 className="text-center mb-4">
                    {editPostId ? "ویرایش پست" : "ثبت پست جدید"}
                </h3>

                <form onSubmit={handleAddPost}>
                    {/* کاربر */}
                    <div className="mb-3">
                        <label className="form-label">کاربر</label>
                        <select
                            className="form-select"
                            value={tempData.userId}
                            onChange={(e) => handleChange("userId", e.target.value)}
                            required
                        >
                            <option value="">کاربر مورد نظر را انتخاب کنید</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* شناسه */}
                    <div className="mb-3">
                        <label className="form-label">شناسه کاربری</label>
                        <input
                            type="text"
                            className="form-control"
                            value={tempData.userId}
                            readOnly
                        />
                    </div>

                    {/* عنوان */}
                    <div className="mb-3">
                        <label className="form-label">عنوان پست</label>
                        <input
                            type="text"
                            className="form-control"
                            value={tempData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="عنوان پست را وارد کنید"
                            required
                        />
                    </div>

                    {/* متن */}
                    <div className="mb-3">
                        <label className="form-label">متن پست</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            value={tempData.body}
                            onChange={(e) => handleChange("body", e.target.value)}
                            placeholder="متن پست خود را وارد کنید"
                            required
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary flex-fill">
                            {editPostId ? "ویرایش" : "ثبت"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary flex-fill"
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