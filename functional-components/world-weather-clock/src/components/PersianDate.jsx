import React, { useState } from "react"
import moment from "moment-jalaali"
const daysOfTheWeek = [
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
]
const monthsOfTheYear = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
]
const PersianDate = () => {
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    // useEffect(() => {
    //     let m = moment()
    // }, []);

    return (
        <>
            <div className="wwc-date">شنبه ۲۰ آبان ۱۴۰۴</div>
            <div className="wwc-time">۱۲:۳۴</div>
        </>
    )
}
export default PersianDate