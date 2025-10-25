import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

const tick = () => {
  const elem = (
    <div>
      <h1>Timer</h1>
      <h3>الان ساعت: {new Date().toLocaleTimeString()}</h3>
    </div>
  );

  // هر بار که tick اجرا میشه، دوباره رندر کن
  root.render(elem);
};

// هر ۱ ثانیه تابع tick اجرا بشه
setInterval(tick, 1000);