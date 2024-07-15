import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  rates: { [key: string]: number };
  values: { [key: string]: string };
}

const initialState: CurrencyState = {
  rates: {
    USD: 1.07,
    EUR: 1,
    //  BYN: 3.5,
  },
  values: {
    USD: "0",
    EUR: "0",
    //  BYN: "0",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyValue: (
      state,
      action: PayloadAction<{ currency: string; value: string }>
    ) => {
      const { currency, value } = action.payload;
      state.values[currency] = value;

      const baseRate = state.rates[currency];
      if (value !== "" && !isNaN(parseFloat(value))) {
        const numericValue = parseFloat(value);
        Object.keys(state.values).forEach((key) => {
          if (key !== currency) {
            state.values[key] = (
              numericValue *
              (state.rates[key] / baseRate)
            ).toFixed(2);
          }
        });
      } else {
        Object.keys(state.values).forEach((key) => {
          if (key !== currency) {
            state.values[key] = "0";
          }
        });
      }
    },
  },
});

export const { setCurrencyValue } = currencySlice.actions;

const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
