import React from "react";
import { Provider } from "react-redux";
import MyStore from "./MyStore";
import store from "../redux/store"; // ✅ مسیر درست استور

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyStore />
      </div>
    </Provider>
  );
}

export default App;
