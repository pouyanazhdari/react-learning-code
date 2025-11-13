import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCountriesRequest, setSelectedCountry } from "../redux/countries/countriesAction";

const SelectCountry = ({ onSelectCountry }) => {
    const dispatch = useDispatch();
    const { data: countries, selectedCountry } = useSelector(
        (state) => state.countries
    );

    useEffect(() => {
        if (countries.length === 0) {
            dispatch(sendCountriesRequest());
        }
    }, [dispatch, countries.length]);

    const sortedCountries = useMemo(() => {
        return [...countries].sort((a, b) =>
            a.name.common.localeCompare(b.name.common, 'en', { sensitivity: 'base' })
        );
    }, [countries]);

    const handleChange = (e) => {
        const key = e.target.value;
        if (!key) {
            dispatch(setSelectedCountry(null));
            return;
        }
        const country = countries.find((c) => c.cca2 === key);
        if (country) {
            dispatch(setSelectedCountry(country));
            onSelectCountry(country)
        }
    };

    return (
        <div className="wwc-left">
            <h1 className="wwc-title">ساعت و دمای کشورها</h1>

            <div className="wwc-select-box">
                <div className="wwc-btn">نام کشورها</div>
                <select
                    className="wwc-select"
                    onChange={handleChange}
                    value={selectedCountry?.cca2 || ""}
                >
                    <option value="">انتخاب کشور</option>
                    {sortedCountries.map((country) => (
                        <option key={country.cca2} value={country.cca2}>
                            {country.name.common}
                        </option>
                    ))}
                </select>
            </div>

            <div className="wwc-info">
                {selectedCountry?.name?.common ? (
                    <p>
                        {selectedCountry?.name?.common} با نام رسمی {selectedCountry?.name?.official} شناخته می‌شود.
                    </p>
                ) : (
                    <p>کشوری انتخاب نشده است.</p>
                )}
            </div>
        </div>
    );
};

export default SelectCountry;