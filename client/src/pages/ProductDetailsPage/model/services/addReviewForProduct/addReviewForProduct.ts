import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { fetchProductById, getProductData } from 'entities/Product';
import { AddNewReviewSchema } from 'features/addNewReview';
import { fetchReviewsByProductId } from '../fetchReviewsByProductId/fetchReviewsByProductId';

interface AddReviewForProductProps {
	text?: string;
	rating?: number;
}

export const addReviewForProduct = createAsyncThunk<
	AddNewReviewSchema,
	AddReviewForProductProps,
	ThunkConfig<string>
>('productDetails/addReviewForProduct', async ({ text, rating }, thinkApi) => {
	const { dispatch, extra, rejectWithValue, getState } = thinkApi;

	const userData = getUserAuthData(getState());
	const product = getProductData(getState());

	if (!userData || !product || !text || !rating) {
		return rejectWithValue('no data');
	}
	try {
		const response = await extra.api.post<AddNewReviewSchema>(
			'/api/review/addNewReview',
			{
				text: text,
				rating: rating,
				product_id: product.id,
				user_id: userData.id,
			}
		);

		if (!response.data) {
			throw new Error();
		}

		dispatch(fetchReviewsByProductId(String(product.id)));
		dispatch(fetchProductById(product.id));

		return response.data;
	} catch (error) {
		return rejectWithValue('error');
	}
});
