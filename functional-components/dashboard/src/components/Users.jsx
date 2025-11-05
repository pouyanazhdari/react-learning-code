import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { deleteUserService, getUsersDataService } from "../assets/features/services/UserServices";
const Users = () => {
    const [users, setUsers] = useState([]);
    const [tempUsers, setTempUsers] = useState([]);
    const searchingTimeoutRef = useRef(null);

    useEffect(() => {
        getUsersDataService().then((data) => {
            setUsers(data);
            setTempUsers(data);
        });

    }, []);

const handleSearch = (e) => {
    clearTimeout(searchingTimeoutRef.current);
    const value = e.target.value.toLowerCase();

    searchingTimeoutRef.current = setTimeout(() => {
        if (value.trim() === "") {
            setTempUsers(users);
        } else {
            setTempUsers(
                users.filter((u) =>
                    u.username.toLowerCase().includes(value)
                )
            );
        }
    }, 500);
};


    const handleView = (u) => {
        console.log('view', u);
    };

const handleDelete = (u) => {
  if (!window.confirm(`آیا از حذف "${u.name}" مطمئنی؟`)) return;

  deleteUserService(u.id).then((success) => {
    if (success) {
      setUsers((prev) => {
        const newUsers = prev.filter((user) => user.id !== u.id);
        setTempUsers(newUsers); // بلافاصله tempUsers رو با newUsers آپدیت می‌کنیم
        return newUsers;
      });
    }
  });
};


    return (
        <div dir="rtl" className="container py-3">
            <div className="card shadow-sm rounded-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">لیست کاربران</h5>
                        <Link to="/users/add" className="btn btn-sm btn-primary">
                            <i className="fa fa-plus-lg me-1" /> کاربر جدید
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
                                placeholder="جستجو در نام، نام کاربری یا ایمیل..."
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
                                    <th scope="col">نام</th>
                                    <th scope="col">نام کاربری</th>
                                    <th scope="col">ایمیل</th>
                                    <th scope="col" className="text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td className="text-muted">{u.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                                                    style={{ width: 36, height: 36, background: '#6c5ce7' }}
                                                >
                                                    {u.name ? u.name[0] : '?'}
                                                </div>
                                                <div className="me-2">
                                                    <div className="fw-semibold">{u.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td className="text-center">
                                            <div className="d-inline-flex">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="نمایش"
                                                    onClick={() => handleView(u)}
                                                >
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <Link
                                                    to={`/users/add/${u.id}`}
                                                    state={{ id: u.id, ops: "Edit" }}
                                                    className="btn btn-sm btn-outline-success mx-1"
                                                    title="ویرایش"
                                                >
                                                    <i className="fa fa-pencil" />
                                                </Link>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="حذف"
                                                    onClick={() => handleDelete(u)}
                                                >
                                                    <i className="fa fa-trash" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="text-muted small">
                            نمایش 1 تا {tempUsers.length} از {tempUsers.length} کاربر
                        </div>
                        <nav aria-label="صفحه‌بندی">
                            <ul className="pagination pagination-sm mb-0">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex={-1}>قبلی</a>
                                </li>
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
};

export default Users;
