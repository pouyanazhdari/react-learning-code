// src/components/TimeList.jsx
import React from 'react';

const TimeList = ({ recordedTime, deleteRecord }) => {
  return (
    <div className="time-list card">
      <h3 className="time-list-title">⏱ زمان‌های ثبت‌شده</h3>

      {recordedTime.length === 0 ? (
        <p className="time-list-empty">هنوز زمانی ثبت نشده</p>
      ) : (
        <ul className="time-list-items">
          {recordedTime.map((item, index) => (
            <li key={index} className="time-list-item">
              <span className="time-list-text">
                {index + 1}. {item.time} — {item.date}
              </span>
              <button
                className="btn btn-delete"
                onClick={() => deleteRecord(index)}
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeList;
