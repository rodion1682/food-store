import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrenyIsLoading = (state: StateSchema) =>
	state?.currency?.isLoading;
