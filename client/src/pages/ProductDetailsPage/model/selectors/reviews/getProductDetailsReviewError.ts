import { StateSchema } from 'app/providers/StoreProvider';

export const getProductDetailsReviewError = (state: StateSchema) =>
	state.productDetailsReviews?.error;
