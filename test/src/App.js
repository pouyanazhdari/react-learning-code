// App.jsx (فانکشنال با هوک‌ها — اصلاح‌شده)
import React, { useRef, useState, useEffect } from 'react';
import Timer from './Timer';

function App() {
  const timerRef = useRef(null);

  // وضعیت اجرای تایمر — با useState و useEffect
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // آپدیت وضعیت اجرای تایمر هر 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimerRunning(timerRef.current?.state?.isRunning ?? false);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // تاریخ شمسی زنده — هر ثانیه آپدیت میشه
  const [currentPersianDate, setCurrentPersianDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const persianDate = now.toLocaleDateString('fa-IR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentPersianDate(persianDate);
    };

    updateDate(); // اولین بار
    const interval = setInterval(updateDate, 1000); // هر ثانیه

    return () => clearInterval(interval);
  }, []);

  // متدهای کنترل
  const startTimer = () => {
    timerRef.current?.handleStart();
  };

  const stopTimer = () => {
    timerRef.current?.handleStop();
  };

  const resetTimer = () => {
    timerRef.current?.handleReset();
  };

  return (
    <div className="app-container">
      {/* کارت اصلی تایمر */}
      <section className="timer-card">
        <header className="card-header">
          <h1 className="card-title">ساعت فعلی</h1>
        </header>

        <main className="card-body">
          {/* کامپوننت تایمر */}
          <Timer ref={timerRef} title="کرونومتر" />

          {/* تاریخ شمسی زنده */}
          <div className="date-display" aria-label="تاریخ امروز">
            {currentPersianDate}
          </div>
        </main>

        <footer className="card-footer">
          <div className="pulse-indicator" aria-hidden="true"></div>
          <span className="status-text">زنده و در حال اجرا</span>
        </footer>
      </section>

      {/* کنترل‌ها */}
      <section className="control-panel" aria-label="کنترل‌های تایمر">
        <button
          onClick={startTimer}
          disabled={isTimerRunning}
          className="control-btn control-btn-start"
          aria-label="شروع تایمر"
        >
          Play شروع
        </button>

        <button
          onClick={stopTimer}
          disabled={!isTimerRunning}
          className="control-btn control-btn-stop"
          aria-label="توقف تایمر"
        >
          Pause توقف
        </button>

        <button
          onClick={resetTimer}
          className="control-btn control-btn-reset"
          aria-label="ریست تایمر"
        >
          Refresh ریست
        </button>
      </section>
    </div>
  );
}

export default App;