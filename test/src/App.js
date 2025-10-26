import React from 'react';
import Timer from './Timer';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.timerRef = React.createRef(); // نام واضح‌تر: camelCase
  }

  // 1. متدهای کنترل — با نام‌گذاری معنادار
  startTimer = () => {
    this.timerRef.current?.handleStart();
  };

  stopTimer = () => {
    this.timerRef.current?.handleStop();
  };

  resetTimer = () => {
    this.timerRef.current?.handleReset();
  };

  // 2. متد کمکی: گرفتن وضعیت اجرای تایمر
  get isTimerRunning() {
    return this.timerRef.current?.state.isRunning ?? false;
  }

  // 3. متد کمکی: فرمت تاریخ
  get formattedDate() {
    const now = new Date();
    return now.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  render() {
    const isRunning = this.isTimerRunning; // خواناتر

    return (
      <div className="app-container">
        {/* کارت اصلی تایمر */}
        <section className="timer-card">
          <header className="card-header">
            <h1 className="card-title">ساعت فعلی</h1>
          </header>

          <main className="card-body">
            {/* کامپوننت تایمر */}
            <Timer ref={this.timerRef} title="کرونومتر" />

            {/* تاریخ شمسی */}
            <div className="date-display" aria-label="تاریخ امروز">
              {this.formattedDate}
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
            onClick={this.startTimer}
            disabled={isRunning}
            className="control-btn control-btn-start"
            aria-label="شروع تایمر"
          >
            Play شروع
          </button>

          <button
            onClick={this.stopTimer}
            disabled={!isRunning}
            className="control-btn control-btn-stop"
            aria-label="توقف تایمر"
          >
            Pause توقف
          </button>

          <button
            onClick={this.resetTimer}
            className="control-btn control-btn-reset"
            aria-label="ریست تایمر"
          >
            Refresh ریست
          </button>
        </section>
      </div>
    );
  }
}

export default App;