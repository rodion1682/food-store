import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Review } from 'entities/Review';

export const fetchReviewsByProductId = createAsyncThunk<
	Review[],
	string | undefined,
	ThunkConfig<string>
>('review/fetchReviewsByProductId', async (productId, thinkApi) => {
	const { dispatch, extra, rejectWithValue } = thinkApi;
	try {
		const response = await extra.api.get<Review[]>(
			'/api/reviews/getReviewsByProductId',
			{
				params: { productId },
			}
		);
		return response.data;
	} catch (error) {
		return rejectWithValue('error');
	}
});
