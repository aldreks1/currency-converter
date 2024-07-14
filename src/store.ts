import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  rates: { [key: string]: number };
  values: { [key: string]: number };
}

const initialState: CurrencyState = {
  rates: {
    USD: 1,
    EUR: 1.07,
  },
  values: {
    USD: 0,
    EUR: 0,
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyValue: (
      state,
      action: PayloadAction<{ currency: string; value: number }>
    ) => {
      const { currency, value } = action.payload;
      state.values[currency] = value;
      const baseRate = state.rates[currency];
      Object.keys(state.values).forEach((key) => {
        if (key !== currency) {
          state.values[key] = parseFloat(
            (value * (state.rates[key] / baseRate)).toFixed(2)
          );
        }
      });
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
