import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CurrencyType } from '../../types/currency';

export const fetchCurrencyData = createAsyncThunk<
	CurrencyType[],
	void,
	ThunkConfig<string>
>('currency/fetchCurrencyData', async (_, thinkApi) => {
	const { extra, rejectWithValue } = thinkApi;
	try {
		const response = await extra.api.get<CurrencyType[]>(
			'/get/getCurrency.php',
			{
				withCredentials: true,
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
