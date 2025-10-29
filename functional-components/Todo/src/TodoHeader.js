import React from 'react';

const TodoHeader = (props) => {
    return (
        <>
        <div className="todo-header">
          <h1>لیست کارهای من</h1>
          <p>امروز چیکار می‌خوای انجام بدی؟</p>
        </div>

        <div className="todo-add">
          <form className="add-form" onSubmit={(e) => {
            props.addTask();
            e.preventDefault()
          }}>
            <input
              type="text"
              className="add-input"
              placeholder="کار جدید رو وارد کن..."
              value={props.inputValue}
              onChange={(e) => { props.setInputValue(e.target.value) }}
            />
            <button type="submit" className="add-btn">
              +
            </button>
          </form>
        </div>
        </>

    );
};

export default TodoHeader;
