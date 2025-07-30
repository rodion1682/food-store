import { StateSchema } from 'app/providers/StoreProvider';

export const getProductDetailsReviewIsLoading = (state: StateSchema) =>
	state.productDetailsReviews?.isLoading;
