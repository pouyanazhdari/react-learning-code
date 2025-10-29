import React from 'react';

const TaskList = (props) => {
    
    return (
        <>
            {props.tasks.length === 0 ? (<p className="task-list-empty">هنوز فعالیتی ثبت نشده</p>
            ) : (
                <ul>
                    {props.tasks.map((task) => (
                        <li key={task.id} className="todo-item">
                            <label className="custom-checkbox">
                                <input
                                    onChange={() => props.onToggleTask(task.id)}
                                    type="checkbox"
                                    checked={task.isDone} />
                                <span className="checkmark"></span>
                            </label>
                            <span className={`todo-text ${(task.isDone)?'taskDone':''}`}>{task.taskText}</span>
                            <button onClick={() => props.onDelete(task.id)} className="delete-btn">×</button>
                        </li>
                    ))}
                </ul>
            )}
        </>

    );
};

export default React.memo(TaskList);
