import store from "../redux/store";
import PersianDate from "./PersianDate";
import { Provider } from "react-redux";
import SelectCountry from "./SelectCountry";
import { useState } from "react";

function App() {
  const [selectedCountry,setSelectedCountry] = useState({})
  return (
    <Provider store={store}>
      <section className="wwc-card">
        <SelectCountry
         onCountrySelect = {setSelectedCountry}
         />
        <div className="wwc-right">
          <div
            className="wwc-flag"
            style={{ backgroundImage: "url('https://flagcdn.com/w320/de.png')" }}>
          </div>
          <div className="wwc-country">ایران - Tehran</div>
          <PersianDate />
          <div className="wwc-temp">۲7°C</div>
        </div>
      </section>
    </Provider>
  );
}

export default App;
