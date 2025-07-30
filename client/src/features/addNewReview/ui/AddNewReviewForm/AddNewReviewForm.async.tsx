import { FC, lazy } from 'react';
import { AddNewReviewFormProps } from './AddNewReviewForm';

export const AddNewReviewFormAsync = lazy<FC<AddNewReviewFormProps>>(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./AddNewReviewForm')), 1500);
		})
);
