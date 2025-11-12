import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";

const CountryDate = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // کشورهایی با تقویم قمری
  const lunarCountries = ["SA", "OM", "YE", "AE", "QA", "BH", "KW"];
  // کشورهایی با تقویم جلالی
  const jalaliCountries = ["IR", "AF"];

  useEffect(() => {
    if (!selectedCountry?.cca2) {
      setDate("کشوری انتخاب نشده");
      setTime("--:--:--");
      return;
    }

    const updateDateTime = () => {
      const now = new Date();

      // --- تقویم جلالی (ایران، افغانستان) ---
      if (jalaliCountries.includes(selectedCountry.cca2)) {
        moment.loadPersian({ dialect: "persian-modern" });
        setDate(moment(now).format("dddd jD jMMMM jYYYY"));
        setTime(moment(now).format("HH:mm:ss")); // ثانیه اضافه شد
      }

      // --- تقویم قمری (کشورهای عربی) ---
      else if (lunarCountries.includes(selectedCountry.cca2)) {
        // تاریخ قمری
        const islamicDate = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(now);

        // زمان 24 ساعته با ثانیه
        const time24 = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        setDate(islamicDate);
        setTime(time24);
      }

      // --- تقویم میلادی (بقیه کشورها) ---
      else {
        const miladiDate = now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const miladiTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        setDate(miladiDate);
        setTime(miladiTime);
      }
    };

    // اولین بار
    updateDateTime();

    // هر ثانیه آپدیت کن
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, [selectedCountry]);

  return (
    <>
      <div className="wwc-date">{date || "در حال بارگذاری..."}</div>
      <div className="wwc-time">{time || "--:--:--"}</div>
    </>
  );
};

export default CountryDate;