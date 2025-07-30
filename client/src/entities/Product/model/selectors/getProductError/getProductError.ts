import { StateSchema } from 'app/providers/StoreProvider';

export const getProductError = (state: StateSchema) =>
	state?.productDetails?.error;
