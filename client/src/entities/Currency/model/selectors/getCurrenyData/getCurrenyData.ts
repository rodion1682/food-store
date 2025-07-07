import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrenyData = (state: StateSchema) => state?.currency?.data;
