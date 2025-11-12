import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryDate from "./CountryDate";
import { getWeatherStatus } from "../redux/weather/weatherAction"

const CountryProfile = () => {
  const selectedCountry = useSelector((state) => state.countries.selectedCountry);
  const weatherStatus = useSelector((state) => state.weather.weatherStatus)
  const dispatch = useDispatch();
  const countryName = selectedCountry?.name?.common || "کشوری انتخاب نشده است";
  const temperature = weatherStatus?.current?.temperature_2m
  const countryCapital = Array.isArray(selectedCountry?.capital)
    ? selectedCountry.capital[0]
    : "-";

  const flagUrl = selectedCountry?.flags?.png || "https://via.placeholder.com/150x100?text=Flag";
  const cca2 = selectedCountry?.cca2
  useEffect(() => {
    if (selectedCountry?.latlng && Array.isArray(selectedCountry.latlng)) {
      dispatch(getWeatherStatus(selectedCountry.latlng));
    }
  }, [selectedCountry, dispatch]);
  return (
    <div className="wwc-right">
      <div
        className="wwc-flag"
        style={{ backgroundImage: `url('${flagUrl}')` }}
      ></div>
      <div className="wwc-country">{`${countryName}(${cca2}) - ${countryCapital}`}</div>
      <CountryDate />
      <div className="wwc-temp">{temperature}°C</div>
    </div>
  );
};

export default CountryProfile;
