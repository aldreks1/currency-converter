import {
  createSlice,
  createAsyncThunk,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

export interface CurrencyState {
  rates: { [key: string]: number };
  values: { [key: string]: string };
  availableCurrencies: string[];
  newCurrency: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CurrencyState = {
  rates: {},
  values: {},
  availableCurrencies: ["USD", "EUR"],
  newCurrency: "",
  status: "idle",
};

export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.rates;
  }
);

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
      const rate = state.rates[currency];
      if (rate) {
        const baseValue = parseFloat(value) || 0;
        state.availableCurrencies.forEach((cur) => {
          if (cur !== currency) {
            const conversionRate = state.rates[cur] / rate;
            state.values[cur] = (baseValue * conversionRate).toFixed(2);
          }
        });
      }
    },
    addCurrency: (state, action: PayloadAction<string>) => {
      const newCurrency = action.payload;
      if (!state.availableCurrencies.includes(newCurrency)) {
        state.availableCurrencies.push(newCurrency);
        state.values[newCurrency] = "0";
      }
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      const currencyToRemove = action.payload;
      state.availableCurrencies = state.availableCurrencies.filter(
        (currency) => currency !== currencyToRemove
      );
      delete state.values[currencyToRemove];
    },
    setNewCurrency: (state, action: PayloadAction<string>) => {
      state.newCurrency = action.payload;
    },
    clearNewCurrency: (state) => {
      state.newCurrency = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchExchangeRates.fulfilled,
        (state, action: PayloadAction<{ [key: string]: number }>) => {
          state.status = "succeeded";
          state.rates = action.payload;
          state.availableCurrencies.forEach((currency) => {
            state.values[currency] = "0";
          });
        }
      )
      .addCase(fetchExchangeRates.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setCurrencyValue,
  addCurrency,
  removeCurrency,
  setNewCurrency,
  clearNewCurrency,
} = currencySlice.actions;

const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
