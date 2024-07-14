import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, setCurrencyValue } from "../../store";
import "./CurrencyConverter.scss";

const CurrencyConverter: React.FC = () => {
  const rates = useSelector((state: RootState) => state.currency.rates);
  const values = useSelector((state: RootState) => state.currency.values);
  const dispatch = useDispatch<AppDispatch>();

  const handleCurrencyChange =
    (currency: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        dispatch(setCurrencyValue({ currency, value }));
      }
    };

  return (
    <div className="currency-converter">
      {Object.keys(rates).map((currency) => (
        <div className="input-group" key={currency}>
          <label htmlFor={currency}>{currency}</label>
          <input
            type="number"
            id={currency}
            value={values[currency]}
            onChange={handleCurrencyChange(currency)}
            min="0"
          />
        </div>
      ))}
    </div>
  );
};

export default CurrencyConverter;
