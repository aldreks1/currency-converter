import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import CurrencyConverter from "./components/CurrencyConverter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CurrencyConverter />
    </Provider>
  );
};

export default App;
