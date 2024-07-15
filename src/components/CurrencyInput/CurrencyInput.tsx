import React from "react";
import "./CurrencyInput.scss";

interface CurrencyInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={currency}>{currency}</label>
      <input type="text" id={currency} value={value} onChange={handleChange} />
    </div>
  );
};

export default CurrencyInput;
