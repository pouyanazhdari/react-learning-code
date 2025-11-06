import React, { useRef, useState, useEffect } from 'react';
import { deletePostService, getPostsDataService } from "../assets/features/services/PostServices";
import { getUsersDataService } from "../assets/features/services/UserServices";
import { Link } from 'react-router-dom';
import useTitle from '../assets/features/HOC/useTitle';
const Posts = (props) => {
    const [postsData, setPostsData] = useState([])
    const [tempPosts, setTempPosts] = useState([])
    const searchingTimeoutRef = useRef(null)
    const [users, setUsers] = useState([]);
    useTitle('Posts')
    useEffect(() => {
        getPostsDataService()
            .then(data => {
                setPostsData(data)
                setTempPosts(data)
            })
        getUsersDataService().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleView = (p) => {
        console.log('view', p);
    };
    const handleDelete = (p) => {
        if (!window.confirm(`آیا از حذف "${p.id}" مطمئنی؟`)) return;

        deletePostService(p.id).then((success) => {
            if (success) {
                setPostsData((prev) => {
                    const newUsers = prev.filter((post) => post.id !== p.id);
                    setTempPosts(newUsers); // بلافاصله tempUsers رو با newUsers آپدیت می‌کنیم
                    return newUsers;
                });
            }
        });
    };
    const handleSearch = (e) => {
        clearTimeout(searchingTimeoutRef.current);
        const value = e.target.value.toLowerCase();

        searchingTimeoutRef.current = setTimeout(() => {
            if (value.trim() === "") {
                // اگر کاربر چیزی وارد نکرده، همه پست‌ها رو نشون بده
                setTempPosts(postsData);
            } else {
                setTempPosts(
                    postsData.filter((p) =>
                        p.title.toLowerCase().includes(value)
                    )
                );
            }
        }, 500);
    };
    const getUserById = (userId) => {
        return users.find(u => u.id === userId)
    }
    return (
        <div dir="rtl" className="container py-3">
            <div className="card shadow-sm rounded-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">لیست پست ها</h5>
                        <Link to="/Posts/add" className="btn btn-sm btn-primary">
                            <i className="bi bi-plus-lg me-1" /> پست جدید
                        </Link>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>
                                <i className="fa fa-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-end-0 ps-0"
                                placeholder="جستجو در عنوان ..."
                                onChange={handleSearch}
                                style={{ borderRadius: "0.375rem 0 0 0.375rem" }}
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="text-muted">شناسه کاربری</th>
                                    <th scope="col">عنوان پست </th>
                                    <th scope="col">شناسه پست</th>
                                    <th scope="col">متن پست</th>
                                    <th scope="col" className="text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempPosts.map((p) => (
                                    <tr key={p.id}>
                                        <td className="text-muted">{getUserById(p.userId)?.name}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="me-2">
                                                    <div className="fw-semibold">{p.title}</div>
                                                    <div className="text-muted small">{getUserById(p.userId)?.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{p.id}</td>
                                        <td>{p.body}</td>
                                        <td className="text-center">
                                            <div className="d-inline-flex">
                                                <button
                                                    className="btn btn-sm btn-outline-primary "
                                                    title="نمایش"
                                                    onClick={() => handleView(p)}
                                                >
                                                    <i className="fa-solid fa-comment"></i>
                                                </button>
                                                <Link
                                                    to={`/Posts/add/${p.id}`}
                                                    state={{ id: p.id, ops: "Edit" }}
                                                    className="btn btn-sm btn-outline-success mx-1"
                                                    title="ویرایش"
                                                >
                                                    <i className="fa fa-pencil-alt"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="حذف"
                                                    onClick={() => handleDelete(p)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="text-muted small">نمایش 1 تا {tempPosts.length} از {tempPosts.length} پست</div>
                        <nav aria-label="صفحه‌بندی">
                            <ul className="pagination pagination-sm mb-0">
                                <li className="page-item disabled"><a className="page-link" href="#" tabIndex={-1}>قبلی</a></li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">بعدی</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Posts;
