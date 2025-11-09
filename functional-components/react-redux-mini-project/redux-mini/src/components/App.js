import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import MyStore from "./MyStore";

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
