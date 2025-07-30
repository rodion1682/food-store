import { lazy } from 'react';

export const ProductDetailsPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./ProductDetailsPage')), 1500);
		})
);
