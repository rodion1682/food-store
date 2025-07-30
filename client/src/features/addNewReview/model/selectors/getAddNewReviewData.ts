import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../slices/addNewReviewSlice';

export const getAddNewReviewData = (state: StateSchema) =>
	state?.addNewReview || initialState;
