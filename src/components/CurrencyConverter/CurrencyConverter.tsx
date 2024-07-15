// src/components/CurrencyConverter/CurrencyConverter.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  AppDispatch,
  setCurrencyValue,
  fetchExchangeRates,
  addCurrency,
  removeCurrency,
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

  const handleRemoveCurrency = (currency: string) => () => {
    dispatch(removeCurrency(currency));
  };

  const availableOptions = Object.keys(rates).filter(
    (currency) => !availableCurrencies.includes(currency)
  );

  return (
    <div className="currency-converter">
      {status === "loading" && <p>Loading exchange rates...</p>}
      {status === "failed" && <p>Failed to load exchange rates</p>}
      {status === "succeeded" && Object.keys(rates).length > 0 && (
        <>
          {availableCurrencies.map((currency) => (
            <div key={currency} className="currency-row">
              <CurrencyInput
                currency={currency}
                value={values[currency]}
                onChange={handleCurrencyChange(currency)}
                onRemove={handleRemoveCurrency(currency)}
              />
            </div>
          ))}
          <div className="add-currency">
            <select
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value)}
            >
              <option value="" disabled>
                Select currency to add
              </option>
              {availableOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <button onClick={handleAddCurrency} disabled={!newCurrency}>
              Add Currency
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
