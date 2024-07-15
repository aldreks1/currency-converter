// src/components/CurrencyConverter/CurrencyConverter.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  AppDispatch,
  setCurrencyValue,
  fetchExchangeRates,
  addCurrency,
} from "../../store";
import CurrencyInput from "../CurrencyInput";
import "./CurrencyConverter.scss";

const CurrencyConverter: React.FC = () => {
  const rates = useSelector((state: RootState) => state.currency.rates);
  const values = useSelector((state: RootState) => state.currency.values);
  const availableCurrencies = useSelector(
    (state: RootState) => state.currency.availableCurrencies
  );
  const status = useSelector((state: RootState) => state.currency.status);
  const dispatch = useDispatch<AppDispatch>();
  const [newCurrency, setNewCurrency] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExchangeRates());
    }
  }, [status, dispatch]);

  const handleCurrencyChange = (currency: string) => (value: string) => {
    dispatch(setCurrencyValue({ currency, value }));
  };

  const handleAddCurrency = () => {
    if (newCurrency && !availableCurrencies.includes(newCurrency)) {
      dispatch(addCurrency(newCurrency));
      setNewCurrency("");
    }
  };

  return (
    <div className="currency-converter">
      {status === "loading" && <p>Loading exchange rates...</p>}
      {status === "failed" && <p>Failed to load exchange rates</p>}
      {status === "succeeded" && Object.keys(rates).length > 0 && (
        <>
          {availableCurrencies.map((currency) => (
            <CurrencyInput
              key={currency}
              currency={currency}
              value={values[currency]}
              onChange={handleCurrencyChange(currency)}
            />
          ))}
          <div className="add-currency">
            <input
              type="text"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
              placeholder="Add new currency (e.g., JPY)"
            />
            <button onClick={handleAddCurrency}>Add Currency</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
