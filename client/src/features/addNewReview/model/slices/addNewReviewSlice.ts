import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewReviewSchema } from '../types/addNewReview';

export const initialState: AddNewReviewSchema = {
	text: '',
	rating: 0,
	error: '',
};

export const addNewReviewSlice = createSlice({
	name: 'addNewReview',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
		},
		setRating: (state, action: PayloadAction<number>) => {
			console.log('action.payload', action.payload);
			state.rating = action.payload;
		},
	},
});

export const { actions: addNewReviewActions } = addNewReviewSlice;
export const { reducer: addNewReviewReducer } = addNewReviewSlice;
