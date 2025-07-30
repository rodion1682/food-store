import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from '../../types/product';

export const fetchProductById = createAsyncThunk<
	Product,
	number,
	ThunkConfig<string>
>('products/fetchProductById', async (productId, thinkApi) => {
	const { dispatch, extra, rejectWithValue } = thinkApi;
	try {
		const response = await extra.api.get<Product>('/api/products/getById', {
			params: { productId },
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
