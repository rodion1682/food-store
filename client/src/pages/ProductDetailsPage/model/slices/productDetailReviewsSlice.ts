import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Review } from 'entities/Review';
import { ProductDetailsReviewScheme } from '../types/ProductDetailsReviewScheme';
import { fetchReviewsByProductId } from '../services/fetchReviewsByProductId/fetchReviewsByProductId';

const reviewsAdapter = createEntityAdapter<Review, number>({
	selectId: (review: Review) => review.id,
});

const emptyState = reviewsAdapter.getInitialState();

export const getProductReviews = reviewsAdapter.getSelectors<StateSchema>(
	(state) => state.productDetailsReviews ?? emptyState
);

const productDetailReviewsSlice = createSlice({
	name: 'productDetailReviewsSlice',
	initialState: reviewsAdapter.getInitialState<ProductDetailsReviewScheme>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReviewsByProductId.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchReviewsByProductId.fulfilled,
				(state, action: PayloadAction<Review[]>) => {
					console.log('Fetched reviews:', action.payload);
					state.isLoading = false;
					reviewsAdapter.setAll(state, action.payload);
				}
			)
			.addCase(fetchReviewsByProductId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: productDetailReviewsReducer } =
	productDetailReviewsSlice;
