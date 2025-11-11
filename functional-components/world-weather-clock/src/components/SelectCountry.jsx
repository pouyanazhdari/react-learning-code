import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCountriesRequest, receiveCountriesError, receiveCountriesResponse } from "../redux/countries/countriesAction";
import { getCountries } from "../redux/countries/countriesAction";
const SelectCountry = ({onCountrySelect}) => {
    const [selectedCountry, setSelectedCountry] = useState({})
    const countriesState = useSelector((state) => state.countries);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCountries())
    }, []);
    const handleSelectedCountery = (key) => {
        const countries = countriesState.data
        let selectedCountry = countries.find((c) => c.cca2 === key);
        if (selectedCountry){
            setSelectedCountry(selectedCountry)
            onCountrySelect(selectedCountry)
        } ;
       
    }
    return (
        <div className="wwc-left">
            <h1 className="wwc-title">ساعت و دمای کشورها</h1>

            <div className="wwc-select-box">
                <div className="wwc-btn">نام کشورها</div>
                <select className="wwc-select" onChange={(e) => handleSelectedCountery(e.target.value)}>
                    {countriesState.data.length > 0 ? (
                        countriesState.data.map((country) => (
                            <option
                                key={country.cca2}
                                value={country.cca2}
                            >{country.name.common}</option>
                        ))
                    ) : (
                        <option>در حال بارگذاری...</option>
                    )}
                </select>
            </div>
            <div className="wwc-info">
                {selectedCountry?.name?.common ? (
                    <p>
                        {selectedCountry.name.common} با نام رسمی {selectedCountry.name.official} شناخته می‌شود.
                    </p>
                ) : (
                    <p>کشوری انتخاب نشده است.</p>
                )}
            </div>
        </div>
    )
}
export default SelectCountry