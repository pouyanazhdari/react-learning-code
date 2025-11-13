import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";

// فقط یک بار load کن
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const CountryDate = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);
  const weatherStatus = useSelector((state) => state.weather.weatherStatus);

  const [date, setDate] = useState("کشوری انتخاب نشده");
  const [time, setTime] = useState("--:--:--");

  const jalaliCountries = ["IR", "AF"];
  const hijriCountries = ["SA", "OM", "YE", "AE", "QA", "BH", "KW"];

  // فقط وقتی weatherStatus اومد، timezone رو بگیر
  const hasWeatherData = !!weatherStatus?.timezone;
  const timezone = hasWeatherData ? weatherStatus.timezone : "UTC";

  useEffect(() => {
    // اگر هیچ کشوری انتخاب نشده
    if (!selectedCountry?.cca2) {
      setDate("کشوری انتخاب نشده");
      setTime("--:--:--");
      return;
    }

    const cca2 = selectedCountry.cca2;
    let timer;

    const updateDateTime = () => {
      const now = new Date();

      // --- تقویم جلالی ---
      if (jalaliCountries.includes(cca2)) {
        const jalaliDate = moment(now).format("dddd jD jMMMM jYYYY");
        const timeStr = moment(now).format("HH:mm:ss");
        setDate(jalaliDate);
        setTime(timeStr);
      }

      // --- تقویم قمری ---
      else if (hijriCountries.includes(cca2)) {
        const hijriDate = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: timezone, // فقط وقتی timezone دقیق داریم
        }).format(now);

        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone,
        });

        setDate(hijriDate);
        setTime(timeStr);
      }

      // --- تقویم میلادی (بقیه کشورها) ---
      else {
        const miladiDate = now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: timezone,
        });

        const miladiTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone,
        });

        setDate(miladiDate);
        setTime(miladiTime);
      }
    };

    // اولین بار
    updateDateTime();

    // هر ثانیه آپدیت
    timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, [selectedCountry, timezone]); // فقط وقتی timezone تغییر کرد، آپدیت بشه

  return (
    <>
      <div className="wwc-date">{date}</div>
      <div className="wwc-time">{time}</div>
    </>
  );
};

export default CountryDate;