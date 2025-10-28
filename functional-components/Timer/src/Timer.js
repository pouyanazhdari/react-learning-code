// Timer.jsx (نسخه نهایی و بهینه)
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext
} from "react";
import { TestContext } from "./testContext";

const Timer = forwardRef(({ title, onStatusChange }, ref) => {
  // وضعیت زمان و اجرا
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // رفرنس برای interval
  const intervalRef = useRef(null);

  // دسترسی به context (اختیاری)
  const context = useContext(TestContext);

  // کنترل تایمر
  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // اطلاع‌رسانی به App هنگام تغییر وضعیت
    onStatusChange?.(isRunning);

    // پاکسازی interval هنگام خروج
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  // متدهای کنترل تایمر
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // فرمت زمان به HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  // متدهایی که App از طریق ref بهشون دسترسی داره
  useImperativeHandle(
    ref,
    () => ({
      handleStart,
      handleStop,
      handleReset,
      formatTime: () => formatTime(seconds)
    }),
    [seconds]
  );

  // UI تایمر
  return (
    <div
      className="timer-display"
      style={{ backgroundColor: context.color || "transparent" }}
    >
      <h2>{title}</h2>
      <p className="time-text">{formatTime(seconds)}</p>
    </div>
  );
});

export default Timer;
