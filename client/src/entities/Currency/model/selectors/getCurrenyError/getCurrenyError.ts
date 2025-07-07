import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrenyError = (state: StateSchema) => state?.currency?.error;
