import store from "../redux/store";
import { Provider } from "react-redux";
import SelectCountry from "./SelectCountry";
import { useState } from "react";
import CountryProfile from "./CountryProfile";

function App() {
  const [selectedCountry, setSelectedCountry] = useState({})
  return (
    <Provider store={store}>
      <section className="wwc-card">
        <SelectCountry
          onSelectCountry={setSelectedCountry}
        />
        <CountryProfile />
      </section>
    </Provider>
  );
}

export default App;
