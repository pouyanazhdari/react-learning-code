import React, { useRef, useState, useEffect, useReducer } from "react";
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
    const params = useLocation();
    const editPostId = params?.state?.id || postId;

    const [postData, dispatch] = useReducer(postReducer, initialState);
    const [tempData, setTempData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const typingTimeoutRef = useRef(null);

    const handleAddPost = async (e) => {
        e.preventDefault();
        await addPostService(editPostId, tempData);
        resetForm();
    };

  const handleChange = useCallback((field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  }, [field, value]);

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
                    id: resultData.id,
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
            <div className="card shadow p-4 rounded-4 w-100">
                <h3 className="text-center mb-4">
                    {postId ? "ویرایش پست" : "ثبت پست جدید"}
                </h3>

                <form onSubmit={handleAddPost}>
                    {/* کاربر */}
                    <div className="mb-3 w-100">
                        <label htmlFor="userSelect" className="form-label">کاربر</label>
                        <select
                            id="userSelect"
                            className="form-control w-100"
                            value={tempData.userId}
                            onChange={(e) => handleChange("userId", e.target.value)}
                        >
                            <option value="">کاربر مورد نظر را انتخاب کنید</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* شناسه کاربری */}
                    <div className="mb-3 w-100">
                        <label htmlFor="userId" className="form-label">شناسه کاربری</label>
                        <input
                            readOnly
                            value={tempData.userId}
                            type="text"
                            id="userId"
                            className="form-control w-100"
                            required
                        />
                    </div>

                    {/* عنوان پست */}
                    <div className="mb-3 w-100">
                        <label htmlFor="title" className="form-label">عنوان پست</label>
                        <input
                            value={tempData.title}
                            type="text"
                            id="title"
                            className="form-control w-100"
                            placeholder="عنوان پست را وارد کنید"
                            required
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                    </div>

                    {/* متن پست */}
                    <div className="mb-3 w-100">
                        <label htmlFor="body" className="form-label">متن پست</label>
                        <textarea
                            value={tempData.body}
                            id="body"
                            className="form-control w-100"
                            placeholder="متن پست خود را وارد کنید"
                            rows={5}
                            required
                            onChange={(e) => handleChange("body", e.target.value)}
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
