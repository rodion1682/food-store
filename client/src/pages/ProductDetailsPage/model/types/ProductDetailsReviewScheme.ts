import { EntityState } from '@reduxjs/toolkit';
import { Review } from 'entities/Review';

export interface ProductDetailsReviewScheme
	extends EntityState<Review, number> {
	isLoading?: boolean;
	error?: string;
}
