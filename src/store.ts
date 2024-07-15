import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

interface CurrencyState {
  rates: { [key: string]: number };
  values: { [key: string]: string };
  availableCurrencies: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CurrencyState = {
  rates: {},
  values: {},
  availableCurrencies: ["USD", "EUR"],
  status: "idle",
  error: null,
};

export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async () => {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
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
            state.values[key] = "";
          }
        });
      }
    },
    addCurrency: (state, action: PayloadAction<string>) => {
      const newCurrency = action.payload;
      if (!state.availableCurrencies.includes(newCurrency)) {
        state.availableCurrencies.push(newCurrency);
        state.values[newCurrency] = "";
      }
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
          // Initialize values with empty strings for new rates
          Object.keys(state.rates).forEach((currency) => {
            if (!state.values[currency]) {
              state.values[currency] = "";
            }
          });
        }
      )
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch exchange rates";
      });
  },
});

export const { setCurrencyValue, addCurrency } = currencySlice.actions;

const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
