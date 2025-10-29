import React from 'react';

const TodoFooter = (props) => {
    return (
        <>
            <div className="todo-footer">
                <span>
                    انجام‌شده: <strong className="count-done">{props.doneCount}</strong>
                </span>
                <span>
                    باقیمانده: <strong className="count-remaining">{props.totalCount - props.doneCount}</strong>
                </span>
                <span>
                    کل کارها: <strong className="count-total">{props.totalCount}</strong>
                </span>
            </div>
        </>

    );
};

export default TodoFooter;
