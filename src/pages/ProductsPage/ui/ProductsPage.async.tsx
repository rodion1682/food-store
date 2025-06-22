import { lazy } from 'react';

export const ProductsPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./ProductsPage')), 1500);
		})
);
