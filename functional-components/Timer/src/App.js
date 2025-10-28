// src/App.js
import React, { useRef, useState, useEffect } from 'react';
import Timer from './Timer';
import TimeList from './timeList.jsx';
import { TestContext } from './testContext.js';

function App() {
  const timerRef = useRef(null);
  const [recordedTime, setRecordedTime] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const startTimer = () => timerRef.current?.handleStart();
  const stopTimer = () => timerRef.current?.handleStop();
  const resetTimer = () => timerRef.current?.handleReset();
  const isTimerRunning = () => timerRef.current?.isRunning ?? false;

  const deleteRecord = (index) => {
    setRecordedTime(prev => prev.filter((_, i) => i !== index));
  };

  const recordTimer = () => {
    const formattedTime = timerRef.current?.formatTime();
    const now = new Date();
    const persianDate = now.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const persianTime = now.toLocaleTimeString('fa-IR');

    setRecordedTime(prev => [...prev, {
      time: formattedTime,
      date: `${persianDate} — ${persianTime}`
    }]);
  };

  const formattedClock = currentTime.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <TestContext.Provider value={{
      color: "transparent",
      number: 123,
      onClick: () => console.log("clicked"),
      recordedTime
    }}>
      <div className="app-container">
        <section className="timer-card">
          <header className="card-header">
            <h1 className="card-title">ساعت فعلی</h1>
            <p className="live-clock-text">{formattedClock}</p>
          </header>

          <main className="card-body">
            <Timer ref={timerRef} title="کرونومتر" />
          </main>

          <footer className="card-footer">
            <div className="pulse-indicator" aria-hidden="true"></div>
            <span className="status-text">زنده و در حال اجرا</span>
          </footer>
        </section>

        <section className="control-panel" aria-label="کنترل‌های تایمر">
          <button
            onClick={startTimer}
            disabled={isTimerRunning()}
            className="control-btn control-btn-start"
          >
            ▶ شروع
          </button>
          <button
            onClick={stopTimer}
            disabled={!isTimerRunning()}
            className="control-btn control-btn-stop"
          >
            ⏸ توقف
          </button>
          <button
            onClick={resetTimer}
            className="control-btn control-btn-reset"
          >
            🔄 ریست
          </button>
          <button
            onClick={recordTimer}
            className="control-btn control-btn-record"
          >
            ⏺ ثبت
          </button>
        </section>

        <TimeList recordedTime={recordedTime} deleteRecord={deleteRecord} />
      </div>
    </TestContext.Provider>
  );
}

export default App;
