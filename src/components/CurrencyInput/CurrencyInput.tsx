import React from "react";
import "./CurrencyInput.scss";
import crossIcon from "../../assets/images/cross.svg";

interface CurrencyInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  value,
  onChange,
  onRemove,
}) => {
  return (
    <div className="currency-input">
      <label htmlFor={currency}>{currency}</label>
      <div>
        <input
          id={currency}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onRemove} className="remove-button">
          <img src={crossIcon} alt="Remove" />
        </button>
      </div>
    </div>
  );
};

export default CurrencyInput;
