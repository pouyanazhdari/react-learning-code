import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendUserRequest, receiveUserResponse, receiveUserError, getUsers } from "../redux/user/userActions";
import axios from "axios"; // حتماً باید ایمپورت بشه!

const MyStore = () => {
  const { loading, data, error } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleGetUser = async () => {
    dispatch(getUsers())
  };

  return (
    <>
      <div className="container mt-4">
        <button
          type="button"
          className="btn btn-primary btn-lg mb-3"
          onClick={handleGetUser}
          disabled={loading}
        >
          {loading ? "در حال دریافت..." : "دریافت کاربران"}
        </button>

        {loading ? (
          <div className="d-flex align-items-center text-primary">
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>در حال بارگذاری...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h5>خطا:</h5>
            <p>{error}</p>
          </div>
        ) : data && data.length > 0 ? (
          <ul className="list-group">
            {data.map((user) => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{user.name}</strong>
                  <small className="text-muted d-block">@{user.username}</small>
                </div>
                <a href={`mailto:${user.email}`} className="text-decoration-none">
                  {user.email}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info text-center">
            <h5>هنوز کاربری دریافت نشده</h5>
            <p>دکمه بالا را بزنید تا کاربران بارگذاری شوند.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyStore;