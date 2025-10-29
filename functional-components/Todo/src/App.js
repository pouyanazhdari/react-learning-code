
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import TaskList from './TaskList'
import TodoFooter from './TodoFooter';
import TodoHeader from './TodoHeader';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const idCounter = useRef(0);
  const doneCount = taskList.filter(task => task.isDone).length;
  const totalCount = taskList.length;
  const addTask = () => {
    const taskText = inputValue.trim();
    if (taskText) {
      setTaskList(prev => [...prev, {
        taskText,
        id: idCounter.current++,
        isDone: false
      }])
      setInputValue('')  // پاک کردن state
    }
  }
  const deleteTask = useCallback((id) => {
    setTaskList(prev => prev.filter(task => task.id !== id));
  }, []);
  const onToggleTask = useCallback((id) => {
    setTaskList(prev => {
      return prev.map(task => (task.id == id ?
        { ...task, isDone: !task.isDone }
        : task)
      )
    })
  }, [])
  return (
    <div className="container">
      <div className="todo-card">
        <TodoHeader
          addTask={addTask}
          inputValue={inputValue}
          setInputValue={setInputValue} />
        <TaskList
          tasks={taskList}
          onDelete={deleteTask}
          onToggleTask={onToggleTask}
        />
        <TodoFooter
          doneCount={doneCount}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}

export default App;
