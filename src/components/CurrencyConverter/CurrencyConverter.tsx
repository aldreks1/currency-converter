import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, setCurrencyValue } from "../../store";
import CurrencyInput from "../CurrencyInput";
import "./CurrencyConverter.scss";

const CurrencyConverter: React.FC = () => {
  const rates = useSelector((state: RootState) => state.currency.rates);
  const values = useSelector((state: RootState) => state.currency.values);
  const dispatch = useDispatch<AppDispatch>();

  const handleCurrencyChange = (currency: string) => (value: string) => {
    dispatch(setCurrencyValue({ currency, value }));
  };

  return (
    <div className="currency-converter">
      {Object.keys(rates).map((currency) => (
        <CurrencyInput
          key={currency}
          currency={currency}
          value={values[currency]}
          onChange={handleCurrencyChange(currency)}
        />
      ))}
    </div>
  );
};

export default CurrencyConverter;
