import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, CurrencyScheme } from '../types/currency';
import { fetchCurrencyData } from '../services/fetchCurrencyData/fetchCurrencyData';

const initialState: CurrencyScheme = {
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrencyData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchCurrencyData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchCurrencyData.rejected, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				}
			});
	},
});

export const { actions: currencyActions } = currencySlice;
export const { reducer: currencyReducer } = currencySlice;
